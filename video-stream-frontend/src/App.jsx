import { useState } from "react";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Header from "./components/nav/Header";
import VideoList from "./components/video/VideoList";
import Video from "./components/video/Video";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn ] = useState(false);

  return (
<>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                {isLoggedIn ?
                    <Routes>
                        <Route path="/video" element={<VideoList setLoggedIn={setLoggedIn}/>}>
                        </Route>
                        <Route path="/video/:id" element={<Video setLoggedIn={setLoggedIn}/>}>
                        </Route>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}>
                        </Route>
                        <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />}>
                        </Route>
                    </Routes>
                }
            </BrowserRouter>
        </>


  );
}

export default App;