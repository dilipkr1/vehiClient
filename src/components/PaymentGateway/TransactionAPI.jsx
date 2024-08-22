import React from 'react';

function TransactionAPI() {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="/static/css/style.css" />
                <title>Transaction API</title>
            </head>
            <body>
                <div className="grid-container">
                    <header className="wrapper">
                        <div className="logo">
                            <a href="../index.html">
                                <img src="/static/images/eb-logo.svg" alt="Easebuzz" />
                            </a>
                        </div>

                        <div className="hedding">
                            <h2><a className="highlight" href="../index.html">Back</a></h2>
                        </div>
                    </header>
                </div>

                <div className="form-container">
                    <h2>TRANSACTION API</h2>
                    <hr />
                    <form method="POST" action="/transaction">
                        <div className="main-form">
                            <h3>Mandatory Parameters</h3>
                            <hr />
                            <div className="mandatory-data">
                                <div className="form-field">
                                    <label htmlFor="txnid">Merchant Transaction ID<sup>*</sup></label>
                                    <input id="txnid" className="txnid" name="txnid" value="" placeholder="ASD12345" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="amount">Transaction Amount<sup>(should be float)*</sup></label>
                                    <input id="amount" className="amount" name="amount" value="" placeholder="125.25" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="email">Customer Email ID<sup>*</sup></label>
                                    <input id="email" className="email" name="email" value="" placeholder="transaction@easebuzz.in" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="phone">Customer Phone Number<sup>*</sup></label>
                                    <input id="phone" className="phone" name="phone" value="" placeholder="0123456789" />
                                </div>
                            </div>

                            <div className="btn-submit">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </body>
        </html>
    );
}

export default TransactionAPI;
