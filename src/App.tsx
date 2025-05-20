import { useEffect, useState } from 'react'
import { UserModel } from './models/userModel'
import { UserService } from './services/userService';
import { ApiClient } from './services/api-client';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router';
import { RecipeService } from './services/recipeService';
import { RecipeModel } from './models/recipeModel';
import type { IdType } from './types/commonTypes';
import './App.css'
import Layout from './components/Layout';
import LatestRecipes from './components/LatestRecipes';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ExploreRecipes from './components/ExploreRecipes';
import MyRecipes from './components/MyRecipes';
import RecipePage from './components/RecipePage';
import EditRecipe from './components/EditRecipe';
import PublishRecipe from './components/PublishRecipe';
import UsersPage from './components/UsersPage';

const apiClient = new ApiClient("http://localhost:3000")

const userService = new UserService(apiClient);
const recipeService = new RecipeService(apiClient);

function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  
  const handleGetUsers = async (): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      console.log(users);
      
      setUsers(users);
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const handleDeleteUser = async (userId:IdType): Promise<void> => {
    try {
      const deleted = await userService.deleteUserById(userId);
      if (deleted) {
        setUsers(users.filter(user => user.id !== deleted.id));
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const handleEditUser = async (user: UserModel): Promise<void> => {
    try {
      await userService.updateUser(user);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
  
  const handleGetRecipes = async (limit: number, tags?: string[], author?: string): Promise<void> => {
    try {
      const recipes = await recipeService.getRecipes(limit, tags, author);
      setRecipes(recipes);
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const handleGetRecipeById = async (recipeId: IdType): Promise<RecipeModel|null> => {
    try {
      return await recipeService.getRecipeById(recipeId);
    } catch (e) {
      console.error((e as Error).message);
      throw e;
    }
  }
  
  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = await userService.login(username, password);
      console.log(user);
      setCurrentUser(user);
      return true;
    } catch (e) {
      console.error((e as Error).message);
      return false
    }
  }

  const handleRegister = async (user: UserModel): Promise<boolean> => {
    try {
      const newUser = await userService.register(user);
      setCurrentUser(newUser);
      return true;
    } catch (e) {
      console.error((e as Error).message)
      return false;
    }
  }

  const handleLogout = () => {
    UserService.logout();
    setCurrentUser(null);
  }

  const handlePublishRecipe = async (recipe: RecipeModel): Promise<void> => {
    try {
      if (currentUser?.status === 'active') { 
        await recipeService.createRecipe(recipe);
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const handleEditRecipe = async (recipe: RecipeModel): Promise<void> => {
    try {
      await recipeService.updateRecipe(recipe);
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  const handleDeleteRecipe = async (recipeId: IdType): Promise<void> => {
    try {
      const deleted = await recipeService.deleteRecipeById(recipeId); 
      setRecipes(recipes.filter(recipe => recipe.id !== deleted.id));
    } catch (e) {
      console.error((e as Error).message);
    }    
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = UserService.getCurrentUser();
      if (userId) {
        try {
          const freshUser = await userService.getUserById(userId);
          setCurrentUser(freshUser);
        } catch (e) {
          console.error("Failed to fetch updated user:", (e as Error).message);
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>

        <Routes>
            <Route path='/' element={<Layout currentUser={currentUser} onLogout={handleLogout}/>} >

            <Route index element={<Navigate to={"/recipes"} replace/>}></Route>
            
            <Route path='recipes'>
              <Route index element={<LatestRecipes recipes={recipes} getRecipes={handleGetRecipes}/>} />
              <Route path='explore' element={<ExploreRecipes recipes={recipes} getRecipes={handleGetRecipes} />} />
              <Route path=':recipeId' element={<RecipePage onGetRecipeById={handleGetRecipeById}/>} />

              <Route element={<ProtectedRoute currentUser={currentUser}/>}>
                <Route path='publish' element={<PublishRecipe currentUser={currentUser!} onPublish={handlePublishRecipe}/>} />
                <Route path='my' element={<MyRecipes currentUser={currentUser!} recipes={recipes} getRecipes={handleGetRecipes} onDelete={handleDeleteRecipe}/>}/>
                <Route path='my/:recipeId/edit' element={<EditRecipe currentUser={currentUser!} onEdit={handleEditRecipe} onGetRecipeById={handleGetRecipeById}/>} />
              </Route>
            </Route>

              <Route element={<AdminRoute currentUser={currentUser} />}>
            
                  <Route path={'users'} element={<UsersPage users={users} onGetUsers={handleGetUsers} onDelete={handleDeleteUser} onEdit={handleEditUser}/>}/>
                  
              </Route>

            <Route path='login' element={<LoginForm onLogin={handleLogin} />} />
            <Route path='register' element={<RegisterForm onRegister={handleRegister}/>} />
          </Route>
          
          <Route path='*' element={<Navigate to='/' replace />} />
      </Routes> 
    </Router>
  )
}

type ProtectedProps = {
  currentUser: UserModel | null;
}

function ProtectedRoute({currentUser}: ProtectedProps) {
  if (!currentUser){
    return <Navigate to={'/login'}/>;
  }
  return <Outlet/>;
}

function AdminRoute({currentUser}: ProtectedProps) {
  if(currentUser?.role!=='admin'){
    return <h1>You must be an admin for this route</h1>
  }

  return <Outlet/>;
}

export default App
