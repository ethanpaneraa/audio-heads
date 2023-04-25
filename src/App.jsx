import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CreatePost from './Pages/creatPost';
import AllPosts from './Pages/AllPosts';
import EditPost from './Pages/EditPost';
import Post from './Pages/Post';
import './App.css'
import { supabase } from './client';


function App() {

  const [posts, setPosts] = useState([]); 



  let elements = useRoutes(
    [
      {
        path:"/audio-heads/",
        element: <AllPosts data={posts} />
      },
      {
        path:"new-posts",
        element: <CreatePost /> 
      },
      {
        path:"/:id",
        element: <Post data={posts} /> 
      },
      {
        path:"/edit-post/:id",
        element: <EditPost data={posts} />
      }
    ]
  )

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
      .from('audio-heads')
      .select()
      .order("created_at", {ascending: true}); 
      setPosts(data); 
    };
    getData(); 
  }, []); 


  return (
    <div className="App">
      <Navbar /> 
      {elements}
    </div>
  )
}

export default App
