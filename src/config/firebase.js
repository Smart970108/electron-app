import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { firebaseConfig } from "./constants";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
    this.store = app.firestore();
    this.user = {};
    app
      .firestore()
      .enablePersistence()
      .catch(function(err) {
        if (err.code === "failed-precondition") {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
    // Subsequent queries will use persistence, if it was enabled successfully
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  login(e, p) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(e, p)
        .then(user => {
          resolve(user);
        })
        .catch(e => reject(e));
    });
  }
  signOut() {
    return this.auth.signOut();
  }
  getUserCfg(uid) {
    return new Promise((resolve, reject) => {
      const userRef = this.db.ref(uid);
      if (userRef) {
        userRef.on("value", snap => {
          resolve(snap.val());
        });
      } else {
        reject("No user found");
      }
    });
  }
  setUserCfg(uid, cfg) {
    return new Promise((resolve, reject) => {
      const userRef = this.db.ref(uid);
      if (userRef) {
        userRef.set({
          cfg: cfg
        });
        resolve(cfg);
      } else {
        reject("No user found");
      }
    });
  }
  getUser(uid) {
    return new Promise((resolve, reject) => {
      this.getSnips(uid).then(data => {
        this.user.snips = data;
      });
      this.getProjects(uid).then(data => {
        this.user.projects = data;
      });
      this.getTags(uid).then(data => {
        this.user.tags = data;
      });
      resolve(this.user);
    });
  }
  getProjects(uid) {
    return new Promise((resolve, reject) => {
      this.store
        .collection(`${uid}`)
        .doc("Projects")
        .get()
        .then(doc => {
          resolve(doc.exists ? doc.data() : []);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  getSnips(uid) {
    return new Promise((resolve, reject) => {
      this.store
        .collection(`${uid}`)
        .doc("Snips")
        .get()
        .then(doc => {
          resolve(doc.exists ? doc.data() : []);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  getTags(uid) {
    return new Promise((resolve, reject) => {
      this.store
        .collection(`${uid}`)
        .doc("tags")
        .get()
        .then(doc => {
          resolve(doc.exists ? doc.data() : []);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default new Firebase();
