(function (window) {
    'use strict';
    var App = window.App || {};
    var LOCAL_DATA_PROPERTIES = ['coffee', 'emailAddress', 'flavor', 'size', 'strength'];
    
  
    function FirebaseDataStore(firebaseConfig, collectionName) {
        if (!firebaseConfig) {
            throw new Error('No firebase config supplied.');
          }
      
          firebase.initializeApp(firebaseConfig);
      
          this.collectionRef = firebase.firestore().collection(collectionName);
    }

    function firestoreDataToLocalData(firestoreData) {
        let localData = {};

    LOCAL_DATA_PROPERTIES.forEach((property) => {
      localData[property] = firestoreData.get(property);
    });

    return localData;
    }

    FirebaseDataStore.prototype.get = function (key, cb) {
        return this.collectionRef.doc(key).get().then((dataItem) => {
            let data = firestoreDataToLocalData(dataItem);
        
            if (cb) {
              console.log(data);
              cb(data);
            }
            
            return data;
        });
      
      };
    
      FirebaseDataStore.prototype.getAll = function (cb) {
        return this.collectionRef.get().then((query) => {
          let allData = {};
    
          query.forEach((dataItem) => {
            allData[dataItem.get('emailAddress')] = firestoreDataToLocalData(dataItem);
          });
    
          return allData;
        });
      };
    


    FirebaseDataStore.prototype.add = function (key, val) {
        console.log(val);
        return this.collectionRef.doc(key).set(val);
      };
    
  
    App.FirebaseDataStore = FirebaseDataStore;
    window.App = App;  
  }) (window);
  