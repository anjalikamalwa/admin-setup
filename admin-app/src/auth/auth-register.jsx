import React from 'react'




const AuthRegister = () => {

  const handleSubmit = async (e) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    e.preventDefault();

    try {
      let item = {name, email, password };
      const response = await fetch(`${apiUrl}api/register`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      localStorage.setItem("item",name, email,password);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };
  return (
    <>
     <div id="app">
    <section className="section">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div className="card card-primary">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form method="POST" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="name">First Name</label>
                      <input id="frist_name" type="text" className="form-control" onChange={(e) => setName(e.target.value)}name="name" autoFocus/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-control" name="email"onChange={(e) => setEmail(e.target.value)}/>
                    <div className="invalid-feedback">
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="password" className="d-block">Password</label>
                      <input id="password" type="password" className="form-control pwstrength" data-indicator="pwindicator"
                        name="password" onChange={(e) => setPassword(e.target.value)}/>
                      <div id="pwindicator" className="pwindicator">
                        <div className="bar"></div>
                        <div className="label"></div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" name="agree" className="custom-control-input" id="agree"/>
                      <label className="custom-control-label" htmlFor="agree">I agree with the terms and conditions</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="mb-4 text-muted text-center">
                Already Registered? <a href="auth-login.html">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
      
    </>
  )
}

export default AuthRegister
