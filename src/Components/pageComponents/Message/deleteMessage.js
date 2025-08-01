
import { getDatabase, ref, update } from "firebase/database";

const deleteMessage = async (messageKey) => {
  const db = getDatabase();
  const messageRef = ref(db, `messages/${messageKey}`);

  try {
    await update(messageRef, {
      message: "Message deleted",
    });
    console.log("Message deleted successfully!");
  } catch (error) {
    console.error("Error deleting message:", error);
  }
};

export default deleteMessage;
