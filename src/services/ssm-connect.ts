
import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";


let cachedSSMConfig: Record<string, Record<string, string>> | null = {};

const ssmClient = new SSMClient({ region: process.env.AWS_REGION! });

export const getSSMParam = async (cacheKey: string, ssmParamArr: string[]) => {
  if (cachedSSMConfig.cacheKey) {
    console.log("SSM confiog exists", JSON.stringify(cachedSSMConfig.cacheKey));
    return cachedSSMConfig.cacheKey;
  }

  console.log("Creating New CachedSSMConfig");
  console.log("SSM Parameter keys are");
  const paramArray = ssmParamArr;
  const ssmParamSet = new GetParametersCommand({
    Names: paramArray,
    WithDecryption: true,
  });

  const ssmParamRes = await ssmClient.send(ssmParamSet);
  console.log(`The Recevied SSMParam is ${JSON.stringify(ssmParamRes)}`);

  const params: Record<string, string> = {};
  ssmParamRes.Parameters?.forEach((ele) => {
    if (ele.Name && ele.Value)
         params[ele.Name] = ele.Value;
  });
  cachedSSMConfig[cacheKey] = params;
  console.log("The SSM Param object is", JSON.stringify(params));

  return cachedSSMConfig[cacheKey];
};