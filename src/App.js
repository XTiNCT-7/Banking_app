import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/nav";



function App() {

  
  return (
    <>
      <Navbar />
      <div className="welcome">
        <div className="container">
          <div className="row">
            <div className="welcome-image col-12 col-md-8 background "></div>
            <div className="welcome-content col-12 col-md-4 d-flex flex-column justify-content-center">
              <div className="welcome-card rounded d-flex flex-column justify-content-center text-center">
                <h2 className="welcome-card__title">Welcome to Bank of Weeb!.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
