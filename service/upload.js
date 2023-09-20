import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const uploadImageAndText = async (imageFile, imageTags) => {
  try {
    console.log(imageFile, imageTags);
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const imageSnapshot = await uploadBytes(storageRef, imageFile);

    // Get the download URL for the uploaded image
    const imageUrl = await getDownloadURL(imageSnapshot.ref);
    console.log(imageUrl);

    // Store associated text data in Firebase Realtime Database
    const imageData = {
      imageUrl,
      tags: imageTags,
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(
            "https://gallery-686d2-default-rtdb.firebaseio.com/images.json",
            {
              method: "POST",
              body: JSON.stringify(imageData),
            }
          );

          console.log(response);
          if (response.ok) {
            console.log("Image and text data uploaded");
          } else {
            console.error(
              "Error uploading image and text data:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error uploading image and text data:", error);
        }
      } else {
        console.log("User is not authenticated.");
      }
    });

    console.log("Image and text data uploaded:");
  } catch (error) {
    console.error("Error uploading image and text data:", error);
  }
};

export const getImageData = async () => {
  const response = await fetch(
    "https://gallery-686d2-default-rtdb.firebaseio.com/images.json"
  );

  console.log(response);
  return response.json();
};
