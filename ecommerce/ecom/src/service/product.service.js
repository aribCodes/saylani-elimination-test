import { db } from "../configuration/firebase/firebase.config";
import { storage } from "../configuration/firebase/firebase.config";
import { set, ref, get, push, child } from "firebase/database";
import {
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export function addProductData(data) {

  const storageRef = sref(storage, `images/${data.productName}`);
  const uploadTask = uploadBytesResumable(storageRef, data.productImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log("Error Ouccured while image uploading: ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            data.productImage = downloadURL;
            const productKey = push(child(ref(db), "products")).key;
            const productRef = ref(db, "products" + "/" + productKey);
            const response = set(productRef, data);
            alert("Product Added");
            return response;
          } catch (error) {
            console.error("Error", error);
          }
      });
    }
  );
}

// export function generateImageUrl(imageUrl, productName) {
//   console.log(imageUrl, productName);

// }
