import {
  Address,
  ContractFunction,
  ResultsParser,
  TypedValue,
  Struct,
} from "@multiversx/sdk-core";
import { smartContract } from "utils/smartContract";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";

const resultsParser = new ResultsParser();

export const useGetResults = () => {
  const fetchResults = async () => {
    try {
      // Create query to call the `getResults` endpoint
      const query = smartContract.createQuery({
        func: new ContractFunction("getResults"),
        args: [],
      });

      const provider = new ProxyNetworkProvider(
        "https://devnet-gateway.multiversx.com" // Ensure the correct network
      );

      // Send query to the smart contract
      const queryResponse = await provider.queryContract(query);

      // Parse the response
      const endpointDefinition = smartContract.getEndpoint("getResults");
      if (!endpointDefinition) {
        throw new Error("getResults endpoint not found in ABI");
      }

      const parsedResponse = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      // Convert the raw values into usable objects
      const rawProposals = parsedResponse.firstValue?.valueOf() || [];

      const formattedResults = rawProposals.map((proposal: any) => ({
        id: proposal.id.valueOf(),
        description: Buffer.from(proposal.description.valueOf()).toString("utf-8"),
        votes: proposal.votes.valueOf().toString(),
      }));

      console.log("Results:", formattedResults);
      return formattedResults;
    } catch (err) {
      console.error("Failed to fetch results:", err);
      throw err;
    }
  };

  return fetchResults;
};
