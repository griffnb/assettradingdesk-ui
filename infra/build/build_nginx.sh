APP="${APP:-}"

if [[ -z "$APP" ]]; then
    echo "Error: APP is required"
    exit 1
fi


export AWS_DEFAULT_REGION=us-east-1
export ARCHITECTURE=X86_64


if [[ -z "$CI" ]]; then
    if ! (aws sts get-caller-identity); then
        aws configure set sso_account_id $LOCAL_ACCOUNT_ID
        aws configure set sso_role_name AdministratorAccess
        aws configure set region us-east-1
        aws configure set output json
        aws configure set sso_start_url https://atlasprivacy.awsapps.com/start
        aws configure set sso_region us-east-1
        aws sso login
    fi
fi




ACCOUNT=$( aws sts get-caller-identity --query Account --output text )
REGION=us-east-1
REPO=$ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$APP
TAG=${GITHUB_SHA:-$(date +%Y%m%d%H%M%S)}

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT.dkr.ecr.$REGION.amazonaws.com

docker build --build-arg CONFIG_TYPE="default-fargate" --tag "$APP-nginx" ./nginx/.

docker tag "$APP-nginx" $REPO:$TAG-nginx
docker push "$REPO:$TAG-nginx"

echo "$REPO:$TAG-nginx"