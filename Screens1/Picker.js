
import {StyleSheet,Text,TouchableOpacity,} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import mime from 'mime'

const Picker = () => {

  const openUploader = async (itemId) => {
    await launchCamera()
        .then((res) => {
            console.log(res.assets[0].uri);

            const newImageUri = "file:///" + res.assets[0].uri.split("file:/").join("");
            
            const imageData = new FormData()
            imageData.append("image", {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            })

            fetch("http://192.168.1.100:3000/api/note/saveimage",
            {body: imageData,
              body: JSON.stringify({ itemId }),
              method: "POST"
            })
            .then((res) => {
              console.log(res);
              })
              .catch(err => {
              console.log(err);
              });

        })
        .catch((err) => {
            console.log(err);
        });
}

  return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Upload Image</Text>
        </TouchableOpacity>  
  );
};

export default Picker;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 5,
    marginVertical: 10,
    width: 250,
    left:40,
    borderRadius:10,
    marginTop:10
  },
  textStyle:{
    color:"black"
  }

});