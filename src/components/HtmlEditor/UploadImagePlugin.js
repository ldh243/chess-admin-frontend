import firebase from 'firebase'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')

export default class UploadImagePlugin {
    constructor( loader) {
        this.loader = loader;
    }

    upload() {
      const loader = this.loader;
        return loader.file
        .then(file => new Promise( ( resolve, reject ) => {
            var user = userRepository.getCurrentUserDetail()

            if(!user){
                return resolve('Cannot send if you are not login')
            }
            
            let fileRef = firebase.storage()
                        .ref("images/lessons/" + user.userId + "/" + file.name);

            let uploadTask = fileRef.put(file);

            uploadTask.on(
              "state_changed",
                _snapshot => {
                  console.log(
                    "snapshot progess " +
                      (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
                  );
                },
                _error => {
                  console.log(_error);
                  reject(_error);
                },
                () => {
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    resolve(
                      {default:downloadURL}
                    )
                  });
                }
              );
        } )
        )
    }
}