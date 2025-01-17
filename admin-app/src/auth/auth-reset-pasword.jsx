import React from "react";

const resetPasword = () => {
  return (
    <>
      <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Reset Password</h4>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Enter Your New Password</p>
                    <form method="POST">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          tabIndex="1"
                          required
                          autoFocus
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control pwstrength"
                          data-indicator="pwindicator"
                          name="password"
                          tabIndex="2"
                          required
                        />
                        <div id="pwindicator" className="pwindicator">
                          <div className="bar"></div>
                          <div className="label"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password-confirm">
                          Confirm Password
                        </label>
                        <input
                          id="password-confirm"
                          type="password"
                          className="form-control"
                          name="confirm-password"
                          tabIndex="2"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabIndex="4"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default resetPasword;
