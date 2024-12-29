import { Address } from "@multiversx/sdk-core";
import { getChainId } from "utils/getChainId";
import { sendTransactions } from "helpers/sdkDappHelpers";

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqj094xa9f7jchp8m4gc9yznugyevntc7ed8ssd58rm3";

export const useAddProposal = () => {
  return async (description: string) => {
    try {
      // Convert the description to hex string
      const descriptionHex = Buffer.from(description).toString('hex');
      
      // Create the transaction data string
      // Function name followed by @ and the hex-encoded argument
      const data = "add_proposal@" + descriptionHex;

      // Construct the transaction
      const transaction = {
        value: 0,
        data: data,
        receiver: new Address(CONTRACT_ADDRESS),
        gasLimit: 60000000,
        chainID: getChainId(),
      };

      // Send the transaction
      await sendTransactions({
        transactions: [transaction],
        transactionsDisplayInfo: {
          processingMessage: "Adding proposal...",
          successMessage: "Proposal added successfully!",
          errorMessage: "Failed to add proposal.",
        },
        redirectAfterSign: false,
      });
    } catch (error) {
      console.error("Error adding proposal:", error);
      throw error;
    }
  };
};