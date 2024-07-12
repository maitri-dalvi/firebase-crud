
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
    getFirestore ,
    addDoc,
    collection ,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "process.env.FIREBASE_API_KEY",
    authDomain: "codedex-9472d.firebaseapp.com",
    projectId: "codedex-9472d",
    storageBucket: "codedex-9472d.appspot.com",
    messagingSenderId: "611026052592",
    appId: "1:611026052592:web:b2e711a1bc63cf96636935"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const notify = document.querySelector('.notify');

  //add data to firestore

async function addData() {
    const name = document.querySelector('#name').value;
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;

    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: name,
            date: date,
            time: time
        })
        notify.innerHTML = `Event Listed`
        document.querySelector('#name').value='';
        document.querySelector('#date').value='';
        document.querySelector('#time').value='';
        getData()

        setTimeout(() => {
            notify.innerHTML=''
        }, 2000);

    } catch (error) {
        console.log(error);
    }
}

const addBtn = document.querySelector('#addData')

addBtn.addEventListener('click', addData)



//   Get Data from Fire store

async function getData() {

    try {
        const getDataQuery = await getDocs(collection(db, 'events'))
        let html = '';

        getDataQuery.forEach((doc)=>{
            const data = doc.data()

            html += `
            <tr>
                
                <td>${data.name}</td>
                <td>${data.date}</td>
                <td>${data.time}</td>
                <td><button class='delBtn' onclick='deleteData("${doc.id}")'>Delete</button></td>
                <td><button class='updateBtn' onclick='updateData("${doc.id}")'>Update</button></td>
            </tr>`
        })
        document.querySelector('table').innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}

getData()


//  deleteData

window.deleteData = async function (id) {
    try {
        await deleteDoc(doc(db, 'events', id))
        notify.innerHTML = `Event Deleted`;

        setTimeout(() => {
            notify.innerHTML=''
        }, 2000);

        getData();

    } catch (error) {
        console.log(error);
    }

}


//  update data 

window.updateData =  async function(id){
    try{
        const docSnapShot = await getDoc(doc(db , "events", id))
        const currentUser  = docSnapShot.data()
        document.querySelector('#name').value= currentUser.name;
        document.querySelector('#date').value=currentUser.date;
        document.querySelector('#time').value=currentUser.time;

        const updateDataBtn = document.querySelector('#update_data')
        updateDataBtn.classList.add('show')
        addBtn.classList.add('hide')
        updateDataBtn.addEventListener('click', async function (){
        const newName = document.querySelector('#name').value;
        const newDate = document.querySelector('#date').value
        const newTime = document.querySelector('#time').value

        if( newName !== null && newDate !== null && newTime !== null){
            await updateDoc(doc(db,'events',id),
            {
                name: newName,
                date: newDate,
                time: newTime,
            })

        notify.innerHTML = `Event Updated`;
        getData()
        updateDataBtn.classList.remove('show')
        addBtn.classList.remove('hide')

        document.querySelector('#name').value="";
        document.querySelector('#date').value="";
        document.querySelector('#time').value="";

        setTimeout(()=>{
            notify.innerHTML = ""
        },2000)

    }

})
    }catch(err){
        console.log(err);
    }

}
























