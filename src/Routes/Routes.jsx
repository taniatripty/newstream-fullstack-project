import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from "../components/Home/Home";
import Error from "../components/Error/Error";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import AddArticle from "../pages/AddArticale/AddArticle";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../pages/Router/PrivateRoute";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import Forbidden from "../components/Error/Forbidden";
import AdminRoute from "../pages/Dashboard/AddminRoute/AdminRoute";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AllPublisher from "../pages/Dashboard/AllPublisher/AllPublisher";
import AllArticles from "../pages/AllArticles/AllArticles";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AllArticle from "../pages/AllArticle/AllArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import PremiumArticle from "../pages/PremiunArticle/PremiumArticle";
import MyArticles from "../pages/MyArticle/MyArticles";
import SubscriptionPage from "../pages/SubscriptionPage/SubscriptionPage";
import Payment from "../pages/Payment/Payment";
import UpdateArticle from "../pages/UpdateArticle/UpdateArticle";
import AboutUs from "../components/AboutUs/AboutUs";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Profile/Profile";
import SubscriptionPlanPage from "../components/SubscriptionPlanPage/SubscriptionPlanPage";
import TermsAndConditions from "../components/TermsAndConditions/TermsAndConditions";
import AdminNotifications from "../pages/Dashboard/AdminNotifications/AdminNotifications";
import Statistics from "../pages/Dashboard/Statistics/Statistics";
import OpinionForm from "../components/Opinion/OpinionForm";
import EntertainmentSection from "../components/EntertainmentSection/EntertainmentSection";


export const router = createBrowserRouter([
  {
    path: "/",
   Component:MainLayout,
   errorElement:<Error></Error>,
   children:[
    {
        index:true,
        Component:Home
    },
    {
      path:'/aboutus',
      Component:AboutUs
    },
    {
      path:'/subscriptionplan',
      Component:SubscriptionPlanPage
    },
    {
      path:'/terms',
      Component:TermsAndConditions
    },
    {
      path:'/addarticle',
     
     element:<PrivateRoute>
      <AddArticle></AddArticle>
     </PrivateRoute>
    },
    {
      path:'/myarticle',
      element:<PrivateRoute>
        <MyArticles></MyArticles>
      </PrivateRoute>
    },
    {
      path:'/article/:id',
     element:<PrivateRoute>
      <UpdateArticle></UpdateArticle>
     </PrivateRoute>

    },
    {
      path:'/payment',
      element:<PrivateRoute>
        <Payment></Payment>
      </PrivateRoute>
    },
    {

      path:'/myprofile',
      element:<PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    },
    {
      path:'entertainment',
      Component:EntertainmentSection
    },
    {
      path:'opinion',
      Component:OpinionForm
    },
    {
      path:'/subscription',
      element:<PrivateRoute>
        <SubscriptionPage></SubscriptionPage>
      </PrivateRoute>
    },
    {
      path:'/allarticle',
      element:
        <AllArticle></AllArticle>
     
    },
    {
        path:'articles/:id',
        element:
          <ArticleDetails></ArticleDetails>
      
    },
    {
      path:'/premium',
     element:<PrivateRoute>
      <PremiumArticle></PremiumArticle>
     </PrivateRoute>
    },
   
    {
        path:'/login',
        Component:Login
    },
    {
        path:'/register',
        Component:Register
    },
    {path:'forbidden',
      Component:Forbidden
    },
   ]
  },
  {
    path:'/dashboard',
   element:<PrivateRoute>
    <Dashboard></Dashboard>
   </PrivateRoute>,
   children:[
    {
      index:true,
      Component:DashboardHome
    },
    {
      path:'notification',
      element:<AdminRoute>
        <AdminNotifications></AdminNotifications>
      </AdminRoute>
    },
    {
      path:'statistics',
      element:<AdminRoute>
        <Statistics></Statistics>
      </AdminRoute>
    },
   {
    path:'alluser',
   element:<AdminRoute>
    <AllUser></AllUser>
   </AdminRoute>
   },
   {
    path:'addpublisher',
    element:<AdminRoute>
      <AddPublisher></AddPublisher>
    </AdminRoute>
   },
   {
    path:'allpublisher',
    element:<AdminRoute>
      <AllPublisher></AllPublisher>
    </AdminRoute>
   },
   {
    path:'allarticles',
    element:<AdminRoute>
      <AllArticles></AllArticles>
    </AdminRoute>
   },
   {
    path:'myprofile',
    element:<AdminRoute>
      <MyProfile></MyProfile>
    </AdminRoute>
   }
   ],
  }
]);
