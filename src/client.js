import { createClient } from '@supabase/supabase-js'; 

const URL = "https://dxqtakvtrkwxkutiqoqn.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cXRha3Z0cmt3eGt1dGlxb3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NzY5MjksImV4cCI6MTk5NzI1MjkyOX0.oxWd1fZcArNScHCMzp5WIGDSM15WshDUzCiWOFKOon8";

export const supabase = createClient(URL, API_KEY); 