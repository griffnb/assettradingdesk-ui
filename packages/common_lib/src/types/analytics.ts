/**
 * Events track individual actions that users took, usually with additional metadata/properties.
 *
 * See https://segment.com/docs/protocols/tracking-plan/best-practices/#formalize-your-naming-and-collection-standards for conventions
 */

interface BaseEventProperties {}

export interface TrackingEvent<
  Name extends string,
  Properties extends object = {},
> {
  name: Name;
  properties: Properties & BaseEventProperties;
}

type AuthenticationSource = "google" | "sso" | "password" | "token_link";

type LoginSignUpEventType =
  | TrackingEvent<
      "User Logged In",
      {
        source: AuthenticationSource;
      }
    >
  | TrackingEvent<
      "User Signed Up",
      {
        source: AuthenticationSource;
      }
    >
  | TrackingEvent<"Password Reset Requested">
  | TrackingEvent<"Password Updated">
  | TrackingEvent<
      "Login Link Requested",
      {
        resend: boolean;
      }
    >
  | TrackingEvent<"Signup Verification Viewed">
  | TrackingEvent<"Waitlist Viewed">;

type SignupQuizEventType = TrackingEvent<
  "Signup Quiz Completed",
  {
    local?: string | boolean;
    otherLeo?: boolean;
    family?: boolean;
    ineligible?: boolean;
  }
>;

type WaitlistEventType = TrackingEvent<"Waitlist Application", {}>;

type CoreEventType =
  | TrackingEvent<
      "Navbar Item Clicked",
      {
        item: string;
      }
    >
  | TrackingEvent<
      "Button Clicked",
      {
        button: string;
      }
    >;

type UserPiiType =
  | "name"
  | "phone"
  | "alias"
  | "email"
  | "address"
  | "birthday"
  | "occupation";
type UserPiiActions =
  | TrackingEvent<
      "Pii Added",
      {
        type: UserPiiType;
      }
    >
  | TrackingEvent<
      "Pii Removed",
      {
        type: UserPiiType;
      }
    >
  | TrackingEvent<
      "Pii Updated",
      {
        type: UserPiiType;
      }
    >;

type OnboardingFlowEventType =
  | TrackingEvent<
      "Onboarding Flow Started",
      {
        flowType: FlowType;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Step Viewed",
      {
        flowType: FlowType;
        stepName: string;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Step Next Clicked",
      {
        flowType: FlowType;
        stepName: string;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Step Completed",
      {
        flowType: FlowType;
        stepName: string;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Step Back",
      {
        flowType: FlowType;
        fromStep: string;
        toStep: string;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Branch Condition Satisfied",
      {
        flowType: FlowType;
        stepName: string;
        branchName: string;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Exited",
      {
        flowType: FlowType;
        stepName: string;
        reason?: string;
        reenrollment: boolean;
      }
    >
  | TrackingEvent<
      "Onboarding Flow Completed",
      {
        flowType: FlowType;
        reenrollment: boolean;
      }
    >;

type EnrollmentEventType =
  | TrackingEvent<
      "Enrollment Step Viewed",
      { flow: string; step: string; reenrollment: boolean }
    >
  | TrackingEvent<"Enrollment Started", { flow: string; reenrollment: boolean }>
  | TrackingEvent<
      "Enrollment Completed",
      { flow: string; reenrollment: boolean }
    >;

type FlowType = "standard" | "dynamic" | "action";

type FamilyEventType =
  | TrackingEvent<
      "Family Member Invited",
      {
        action:
          | "sent"
          | "resend"
          | "added_email_to_existing"
          | "sent_reenroll_email";
        isMinor: boolean;
        isShared: boolean;
        relation: number;
        emailless: boolean;
        isResend: boolean;
      }
    >
  | TrackingEvent<
      "Family Member Removed",
      {
        isMinor: boolean;
        relation: number;
      }
    >
  | TrackingEvent<
      "Family Member Invite Cancelled",
      {
        isMinor: boolean;
        relation: number;
      }
    >
  | TrackingEvent<
      "Family Member Updated",
      {
        isMinor: boolean;
        isShared: boolean;
        emailless: boolean;
      }
    >
  | TrackingEvent<"Invite Link Shared", {}>
  | TrackingEvent<
      "NJ Suggestions Shown",
      {
        count: number;
      }
    >;

type SupportEventType = TrackingEvent<"Helpscout Opened">;

type PaymentEventType = TrackingEvent<
  "Subscription Paid",
  {
    couponId: string;
    price: string;
  }
>;

type IdentityInsuranceEventType =
  | TrackingEvent<"Identity Insurance Enrolled">
  | TrackingEvent<"Identity Insurance Notice Submitted">
  | TrackingEvent<"Identity Insurance Terms Viewed">
  | TrackingEvent<"Identity Insurance Coverage Viewed">;

type AtlasmailEventType =
  | TrackingEvent<"Atlasmail Message Read">
  | TrackingEvent<"Atlasmail Draft Saved">
  | TrackingEvent<
      "Atlasmail Message Sent",
      {
        action: "new" | "reply" | "forward";
      }
    >;

type TakedownSettingsEventType =
  | TrackingEvent<
      "Takedowns PII Takedown Toggled",
      {
        enabled: boolean;
        kind: UserPiiType;
      }
    >
  | TrackingEvent<
      "Takedowns Data Broker Toggled",
      {
        enabled: boolean;
        broker: string;
      }
    >
  | TrackingEvent<"Takedowns PII Takedown Edit", {}>
  | TrackingEvent<"Takedowns PII Takedown Save", {}>
  | TrackingEvent<"Takedowns Data Broker Edit", {}>
  | TrackingEvent<"Takedowns Data Broker Save", {}>
  | TrackingEvent<"Takedowns Settings Sent", {}>;

type PeopleSearch = TrackingEvent<
  "Data Brokers Scan Results",
  { progress: number; numHits: number }
>;

type DarkwebScan = TrackingEvent<
  "Dark Web Scan Results",
  { numBreaches: number }
>;

type AddressValidationEventType = TrackingEvent<
  "Address Validation Results",
  { submitted: number; validated: number; confirmable: number; mustFix: number }
>;

type AlertEventType =
  | TrackingEvent<"Alert Displayed", { key: string }>
  | TrackingEvent<"Alert Clicked", { key: string }>;

type DuplicatesEventType =
  | TrackingEvent<"Potential Duplicates Found", { count: number }>
  | TrackingEvent<
      "Potential Duplicates Login Link",
      { targetAccountId: string }
    >;

type DSREventType =
  | TrackingEvent<
      "DSR PII Selection Changed",
      {
        selectedPiiCount: number;
      }
    >
  | TrackingEvent<
      "DSR Broker Selection Changed",
      {
        action: "select_all" | "deselect_all" | "select" | "deselect";
        brokerCount: number;
      }
    >;

type TosEventType =
  | TrackingEvent<
      "TOS Signed",
      {
        tos: string;
        flowType: FlowType | "";
      }
    >
  | TrackingEvent<
      "TOS Viewed",
      {
        tos: string;
        flowType: FlowType | "";
      }
    >
  | TrackingEvent<
      "Needs TOS",
      {
        tos: string;
        flowType: FlowType | "";
      }
    >
  | TrackingEvent<
      "TOS Already Signed",
      {
        tos: string;
        flowType: FlowType | "";
      }
    >
  | TrackingEvent<
      "TOS Checked",
      {
        tos: string;
        flowType: FlowType | "";
      }
    >;

type VerifyEventType =
  | TrackingEvent<"Email Verified">
  | TrackingEvent<"Email Verified">
  | TrackingEvent<"Email Verification Requested">;

export type EventType =
  | CoreEventType
  | LoginSignUpEventType
  | OnboardingFlowEventType
  | EnrollmentEventType
  | UserPiiActions
  | FamilyEventType
  | SupportEventType
  | PaymentEventType
  | IdentityInsuranceEventType
  | AtlasmailEventType
  | TakedownSettingsEventType
  | PeopleSearch
  | SignupQuizEventType
  | AddressValidationEventType
  | DarkwebScan
  | AlertEventType
  | DuplicatesEventType
  | WaitlistEventType
  | DSREventType
  | TosEventType
  | VerifyEventType;

export type EventNames = EventType["name"];
