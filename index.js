import {Navigation} from "react-native-navigation";

import main from "./Pages/MainPage";
import loader from "./Pages/Loader";
import Order from "./Pages/Order";
import Home from "./Pages/HomePage";
import Cart from "./Pages/CartPage";
import Side from "./Pages/SidePage";
import CheckOut from "./Pages/CheckOutPage";

 // auth page
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Reset from "./Auth/Reset";
import Forgot from "./Auth/Forgot";
import Profile from "./Auth/Profile";



// Navigation route
Navigation.registerComponent("MainPage", ()=>main)
Navigation.registerComponent("Loading", ()=>loader)
Navigation.registerComponent("OrderPage", ()=>Order)
Navigation.registerComponent("HomePage", ()=>Home)
Navigation.registerComponent("CartPage", ()=>Cart)
Navigation.registerComponent("CheckOutPage", ()=>CheckOut)
Navigation.registerComponent("SidePage", ()=>Side)


Navigation.registerComponent("LoginPage", ()=>Login)
Navigation.registerComponent("RegisterPage", ()=>Register)
Navigation.registerComponent("ResetPage", ()=>Reset)
Navigation.registerComponent("ForgotPage", ()=>Forgot)
Navigation.registerComponent("ProfilePage", ()=>Profile)


Navigation.setDefaultOptions({
    statusBar:{
        backgroundColor:"#B98068"
    },
    topBar: {
        visible: false,
        drawBehind: true,
        animate: false
    }
});


const sideMenu ={
    left:{
        component:{
            name:"SidePage"
        }
    },
    center:{
        stack:{
            id:"side_menu",
            children:[
                {
                    component:{
                        name:"MainPage"
                    }
                }
            ]
        }

    }
}



Navigation.events().registerAppLaunchedListener(()=>{
    Navigation.setRoot({
        root:{
            sideMenu
        }
    })
})
