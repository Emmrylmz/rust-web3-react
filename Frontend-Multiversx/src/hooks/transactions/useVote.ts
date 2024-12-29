import { Address } from "@multiversx/sdk-core";
import { getChainId } from "utils/getChainId";
import { sendTransactions } from "helpers/sdkDappHelpers";

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqj094xa9f7jchp8m4gc9yznugyevntc7ed8ssd58rm3";

export const useVote = () => {
  return async (proposalId: number) => {
    try {
      // Convert proposalId to hex string without leading zeros
      const proposalIdHex = proposalId.toString(16).padStart(2, "0");

      // Create the transaction data string
      const data = `vote@${proposalIdHex}`;

      // Construct the transaction
      const transaction = {
        value: "0", // Ensure value is a string "0"
        data: data,
        receiver: new Address(CONTRACT_ADDRESS),
        gasLimit: 60000000,
        chainID: getChainId(),
      };

      // Send the transaction
      await sendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: {
          processingMessage: "Casting vote...",
          successMessage: "Vote cast successfully!",
          errorMessage: "Failed to cast vote.",
        },
        redirectAfterSign: false,
      });
    } catch (error) {
      console.error("Error voting:", error);
      throw error;
    }
  };
};
