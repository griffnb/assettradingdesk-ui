import { BaseStore, IBaseStoreModel } from "../BaseStore";

/**
 * Extended interface for models that support serialization
 */
export interface ISerializableStoreModel extends IBaseStoreModel {
  getAttributes(): object;
}

/**
 * Configuration options for IndexedDB DataStore
 */
export interface IndexDBDataStoreOptions<T extends ISerializableStoreModel> {
  /** The store class for creating and loading models */
  store: BaseStore<T>;
  /** Name of the database */
  databaseName: string;
  /** Name of the object store */
  objectStoreName: string;
  /** Database version */
  version?: number;
  /** Primary key field name (defaults to 'id') */
  keyPath?: string;
}

/**
 * Response wrapper for datastore operations
 */
export interface DataStoreResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * IndexedDB-based datastore for storing and retrieving MobX models
 * Uses the same pattern as APIStore but persists data locally
 *
 * @example
 * ```typescript
 * // Create a datastore for UserModel
 * const userDataStore = new IndexDBDataStore({
 *   store: Store.user,
 *   databaseName: 'myapp_db',
 *   objectStoreName: 'users',
 *   version: 1
 * });
 *
 * // Save a user
 * const user = Store.user.create({ name: 'John Doe', email: 'john@example.com' });
 * const saveResult = await userDataStore.save(user);
 *
 * // Get a user
 * const getResult = await userDataStore.get('user_id');
 * if (getResult.success) {
 *   const user = getResult.data; // Properly deserialized MobX model
 * }
 *
 * // Get all users
 * const allUsers = await userDataStore.getAll();
 *
 * // Delete a user
 * await userDataStore.delete('user_id');
 *
 * // Clear all data
 * await userDataStore.clear();
 *
 * // Close connection when done
 * userDataStore.close();
 * ```
 */
export class IndexDBDataStore<T extends ISerializableStoreModel> {
  private store: BaseStore<T>;
  private databaseName: string;
  private objectStoreName: string;
  private version: number;
  private keyPath: string;
  private db: IDBDatabase | null = null;

  constructor(options: IndexDBDataStoreOptions<T>) {
    this.store = options.store;
    this.databaseName = options.databaseName;
    this.objectStoreName = options.objectStoreName;
    this.version = options.version || 1;
    this.keyPath = options.keyPath || "id";
  }

  /**
   * Initialize the IndexedDB connection
   */
  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve();
        return;
      }

      const request = indexedDB.open(this.databaseName, this.version);

      request.onerror = () => {
        reject(new Error(`Failed to open database: ${request.error?.message}`));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          const objectStore = db.createObjectStore(this.objectStoreName, {
            keyPath: this.keyPath,
            autoIncrement: false,
          });

          // Create indexes as needed
          objectStore.createIndex("id", "id", { unique: false });
        }
      };
    });
  }

  /**
   * Get a transaction for the object store
   */
  private async getTransaction(
    mode: IDBTransactionMode = "readonly",
  ): Promise<IDBObjectStore> {
    await this.initDatabase();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    const transaction = this.db.transaction([this.objectStoreName], mode);
    return transaction.objectStore(this.objectStoreName);
  }

  /**
   * Save a model to IndexedDB
   * Uses the model's getAttributes() method to serialize the data
   */
  async save(model: T): Promise<DataStoreResponse<T>> {
    try {
      const objectStore = await this.getTransaction("readwrite");

      // Get serialized attributes from the model
      const attributes = model.getAttributes();

      return new Promise((resolve) => {
        const request = objectStore.put(attributes);

        request.onsuccess = () => {
          resolve({
            success: true,
            data: model,
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to save record: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `Save operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Save multiple models to IndexedDB
   */
  async saveMany(models: T[]): Promise<DataStoreResponse<T[]>> {
    try {
      const objectStore = await this.getTransaction("readwrite");
      const savedModels: T[] = [];
      let errorCount = 0;

      return new Promise((resolve) => {
        let completed = 0;

        if (models.length === 0) {
          resolve({
            success: true,
            data: [],
          });
          return;
        }

        models.forEach((model, index) => {
          const attributes = model.getAttributes();
          const request = objectStore.put(attributes);

          request.onsuccess = () => {
            savedModels[index] = model;
            completed++;

            if (completed === models.length) {
              resolve({
                success: errorCount === 0,
                data: savedModels,
                error:
                  errorCount > 0
                    ? `${errorCount} models failed to save`
                    : undefined,
              });
            }
          };

          request.onerror = () => {
            errorCount++;
            completed++;

            if (completed === models.length) {
              resolve({
                success: errorCount === 0,
                data: savedModels,
                error:
                  errorCount > 0
                    ? `${errorCount} models failed to save`
                    : undefined,
              });
            }
          };
        });
      });
    } catch (error) {
      return {
        success: false,
        error: `Batch save operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get a model by its ID
   * Uses the store's load() method to deserialize data back into proper MobX models
   */
  async get(id: string): Promise<DataStoreResponse<T>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        const request = objectStore.get(id);

        request.onsuccess = () => {
          if (request.result) {
            // Use the store's load method to create a proper MobX model
            const model = this.store.load(request.result);
            resolve({
              success: true,
              data: model,
            });
          } else {
            resolve({
              success: false,
              error: `Record with id ${id} not found`,
            });
          }
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to get record: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `Get operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get all models from the store
   * Uses the store's loadMany() method to deserialize data back into proper MobX models
   */
  async getAll(): Promise<DataStoreResponse<T[]>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        const request = objectStore.getAll();

        request.onsuccess = () => {
          // Use the store's loadMany method to create proper MobX models
          const models = this.store.loadMany(request.result);
          resolve({
            success: true,
            data: models,
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to get all records: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `GetAll operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get multiple models by their IDs
   * Uses a cursor-based approach for better performance than individual gets
   */
  async getMany(ids: string[]): Promise<DataStoreResponse<T[]>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        if (ids.length === 0) {
          resolve({
            success: true,
            data: [],
          });
          return;
        }

        // For small arrays, individual gets might be faster due to overhead
        if (ids.length <= 5) {
          return this.getManyIndividual(ids).then(resolve);
        }

        // For larger arrays, use cursor for better performance
        const idsSet = new Set(ids);
        const models: T[] = [];
        const request = objectStore.openCursor();

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            const key = cursor.primaryKey as string;
            if (idsSet.has(key)) {
              const model = this.store.load(cursor.value);
              models.push(model);
              idsSet.delete(key); // Remove found key to avoid duplicates

              // If we found all requested IDs, we can stop early
              if (idsSet.size === 0) {
                resolve({
                  success: true,
                  data: models,
                });
                return;
              }
            }
            cursor.continue();
          } else {
            // Cursor finished, return what we found
            resolve({
              success: true,
              data: models,
              error:
                idsSet.size > 0
                  ? `${idsSet.size} records not found`
                  : undefined,
            });
          }
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to get records: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `GetMany operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get records using a range query (more efficient for large datasets)
   * @param range IDBKeyRange to filter records
   * @param limit Optional limit on number of records to return
   */
  async getByRange(
    range?: IDBKeyRange,
    limit?: number,
  ): Promise<DataStoreResponse<T[]>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        const models: T[] = [];
        let count = 0;
        const request = objectStore.openCursor(range);

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor && (!limit || count < limit)) {
            const model = this.store.load(cursor.value);
            models.push(model);
            count++;
            cursor.continue();
          } else {
            resolve({
              success: true,
              data: models,
            });
          }
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to get records by range: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `GetByRange operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get records using an index
   * @param indexName Name of the index to use
   * @param value Value to search for in the index
   * @param limit Optional limit on number of records to return
   */
  async getByIndex(
    indexName: string,
    value: string | number | Date,
    limit?: number,
  ): Promise<DataStoreResponse<T[]>> {
    try {
      const objectStore = await this.getTransaction("readonly");
      const index = objectStore.index(indexName);

      return new Promise((resolve) => {
        const models: T[] = [];
        let count = 0;
        const request = index.openCursor(IDBKeyRange.only(value));

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor && (!limit || count < limit)) {
            const model = this.store.load(cursor.value);
            models.push(model);
            count++;
            cursor.continue();
          } else {
            resolve({
              success: true,
              data: models,
            });
          }
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to get records by index: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `GetByIndex operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Helper method for getting multiple records individually (for small arrays)
   */
  private async getManyIndividual(
    ids: string[],
  ): Promise<DataStoreResponse<T[]>> {
    try {
      const objectStore = await this.getTransaction("readonly");
      const models: T[] = [];
      let completed = 0;
      let errorCount = 0;

      return new Promise((resolve) => {
        ids.forEach((id, index) => {
          const request = objectStore.get(id);

          request.onsuccess = () => {
            if (request.result) {
              models[index] = this.store.load(request.result);
            }
            completed++;

            if (completed === ids.length) {
              // Filter out undefined values for IDs that weren't found
              const filteredModels = models.filter(Boolean);
              resolve({
                success: errorCount === 0,
                data: filteredModels,
                error:
                  errorCount > 0
                    ? `${errorCount} records failed to load`
                    : undefined,
              });
            }
          };

          request.onerror = () => {
            errorCount++;
            completed++;

            if (completed === ids.length) {
              const filteredModels = models.filter(Boolean);
              resolve({
                success: errorCount === 0,
                data: filteredModels,
                error:
                  errorCount > 0
                    ? `${errorCount} records failed to load`
                    : undefined,
              });
            }
          };
        });
      });
    } catch (error) {
      return {
        success: false,
        error: `GetManyIndividual operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Delete a record by its ID
   */
  async delete(id: string): Promise<DataStoreResponse<boolean>> {
    try {
      const objectStore = await this.getTransaction("readwrite");

      return new Promise((resolve) => {
        const request = objectStore.delete(id);

        request.onsuccess = () => {
          resolve({
            success: true,
            data: true,
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to delete record: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `Delete operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Delete multiple records by their IDs
   */
  async deleteMany(ids: string[]): Promise<DataStoreResponse<boolean>> {
    try {
      const objectStore = await this.getTransaction("readwrite");
      let completed = 0;
      let errorCount = 0;

      return new Promise((resolve) => {
        if (ids.length === 0) {
          resolve({
            success: true,
            data: true,
          });
          return;
        }

        ids.forEach((id) => {
          const request = objectStore.delete(id);

          request.onsuccess = () => {
            completed++;

            if (completed === ids.length) {
              resolve({
                success: errorCount === 0,
                data: true,
                error:
                  errorCount > 0
                    ? `${errorCount} records failed to delete`
                    : undefined,
              });
            }
          };

          request.onerror = () => {
            errorCount++;
            completed++;

            if (completed === ids.length) {
              resolve({
                success: errorCount === 0,
                data: true,
                error:
                  errorCount > 0
                    ? `${errorCount} records failed to delete`
                    : undefined,
              });
            }
          };
        });
      });
    } catch (error) {
      return {
        success: false,
        error: `DeleteMany operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Clear all records from the object store
   */
  async clear(): Promise<DataStoreResponse<boolean>> {
    try {
      const objectStore = await this.getTransaction("readwrite");

      return new Promise((resolve) => {
        const request = objectStore.clear();

        request.onsuccess = () => {
          resolve({
            success: true,
            data: true,
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to clear object store: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `Clear operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Count the number of records in the object store
   */
  async count(): Promise<DataStoreResponse<number>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        const request = objectStore.count();

        request.onsuccess = () => {
          resolve({
            success: true,
            data: request.result,
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to count records: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `Count operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Check if a record exists by its ID
   */
  async exists(id: string): Promise<DataStoreResponse<boolean>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        const request = objectStore.count(id);

        request.onsuccess = () => {
          resolve({
            success: true,
            data: request.result > 0,
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to check existence: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `Exists operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get all keys in the object store
   */
  async getAllKeys(): Promise<DataStoreResponse<string[]>> {
    try {
      const objectStore = await this.getTransaction("readonly");

      return new Promise((resolve) => {
        const request = objectStore.getAllKeys();

        request.onsuccess = () => {
          resolve({
            success: true,
            data: request.result as string[],
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: `Failed to get all keys: ${request.error?.message}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: `GetAllKeys operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get database information
   */
  getDatabaseInfo() {
    return {
      databaseName: this.databaseName,
      objectStoreName: this.objectStoreName,
      version: this.version,
      keyPath: this.keyPath,
      isConnected: this.db !== null,
    };
  }

  /**
   * Close the database connection
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
