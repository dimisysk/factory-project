Οδηγίες για την Εκκίνηση και Διαχείριση του Angular Front-End

## 1: Απαιτήσεις Συστήματος:

- Εγκατεστημένο Node.js (συνιστάται η τελευταία LTS έκδοση).
- Εγκατεστημένο Angular CLI (npm install -g @angular/cli).

## 2: Βήματα για την Εκκίνηση:

- Clone του Repository:
  ```bash
  git clone <URL ΤΟΥ REPOSITORY>
  ```

- Εγκατάσταση των Εξαρτήσεων: 
  ```bash
  npm install
  ```
  Αυτό θα εγκαταστήσει όλες τις απαραίτητες βιβλιοθήκες που περιλαμβάνονται στο package.json.
- Εκκίνηση της Εφαρμογής: Για να εκκινήσετε την εφαρμογή σε λειτουργία ανάπτυξης:
    ```bash
  ng serve
  ```
  Ανοίξτε τον browser στη διεύθυνση: http://localhost:4200.

## 3: Σημειώσεις για τον Χρήστη:

- Για να διασφαλιστεί ότι το front-end επικοινωνεί σωστά με το backend, ελέγξτε ότι το backend εκτελείται στη σωστή πόρτα (π.χ., 8080).
- Οι ενέργειες όπως η δημιουργία, ενημέρωση και διαγραφή δεδομένων απαιτούν σωστά tokens που δημιουργούνται κατά την είσοδο του χρήστη.

## 4: Εντολές Παραγωγής:

- Για να χτίσετε την εφαρμογή για παραγωγή, εκτελέστε:
     ```bash
  ng build --prod
  ```

## 5: Συντήρηση: 
- Για την εγκατάσταση νέων πακέτων:
     ```bash
    npm install <PACKAGE_NAME>

    ```
## 6: Τελικός Έλεγχος: 
- Βεβαιωθείτε ότι όλα τα endpoints του backend είναι διαθέσιμα και 
  οι λειτουργίες όπως η σύνδεση και η εγγραφή λειτουργούν κανονικά πριν την υποβολή.
