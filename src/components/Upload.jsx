// Installed by "react-uploader".
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Button } from "reactstrap";

// Initialize once (at the start of your app).
const uploader = Uploader({
  apiKey: "public_FW25bcPEH9sgALD6ygikF3cp4qB4",
}); // Replace "free" with your API key.

export const Upload = ({onUploadComplete}) => (
  <UploadButton
    uploader={uploader}
    options={{ multi: true }}
    onComplete={(files) => {
      console.log({files})
      console.log(files[0].fileUrl)
      onUploadComplete(files[0].fileUrl)
    }}
  >
    {({ onClick }) => <Button onClick={onClick}>Upload</Button>}
  </UploadButton>
);
