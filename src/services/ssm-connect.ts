
import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";


let cachedSSMConfig: Record<string, Record<string, string>> | null = {};

const ssmClient = new SSMClient({ region: process.env.AWS_REGION! });

export const getSSMParam = async (cacheKey: string, ssmParamArr: string[]) => {
  if (cachedSSMConfig[cacheKey]) {
    console.log("SSM config exists", JSON.stringify(cachedSSMConfig[cacheKey]));
    return cachedSSMConfig[cacheKey];
  }

  console.log("Creating New CachedSSMConfig");

  try {
    const ssmParamSet = new GetParametersCommand({
      Names: ssmParamArr,
      WithDecryption: true,
    });
    console.log("The SSM Param set is", JSON.stringify(ssmParamSet));
    const ssmParamRes = await ssmClient.send(ssmParamSet);
    console.log(`The Received SSMParam is ${JSON.stringify(ssmParamRes)}`);

    const params: Record<string, string> = {};
    ssmParamRes.Parameters?.forEach((ele) => {
      if (ele.Name && ele.Value) {
        params[ele.Name] = ele.Value;
      }
    });
    cachedSSMConfig[cacheKey] = params;
    console.log("The SSM Param object is", JSON.stringify(params));

    return cachedSSMConfig[cacheKey];
  } catch (error) {
    console.error("Error fetching SSM parameters:", error);
    throw error;
  }
};