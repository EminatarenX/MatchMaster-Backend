import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

  const { email, nombre, token } = datos


  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5c73a16264e257",
    pass: "b0b35da0d73cce"
  }

    // service: "gmail",
    // auth: {
    //   user: "estudiaconofort@gmail.com",
    //   pass: "iwmjexmtnnicglsr"
    // }
  });


  //informacion del email
  const info = await transport.sendMail({
    from: '"EstudiaConfort - Conoce tu nueva habitación" <cuentas@estudiaconfort.com>',
    to: email,
    subject: 'EstudiaConfort - Confirma tu cuenta!',
    text: 'Bienvenido a Estudia Confort, confirma tu cuenta',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
    
            .main {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                justify-content: center;
                background-color: #F97316;
                padding: 1.25rem;
            }
    
            .card {
                background-color: white;
                border-radius: 0.75rem;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                padding: 1.25rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            h1 {
                font-size: 2.5rem;
                font-weight: bold;
            }
    
            p {
                font-size: 1.25rem;
                color: #4A5568;
                margin: 0.625rem 0;
            }
    
            .btn {
                display: inline-block;
                padding: 0.5rem 1rem;
                background-color: #F97316;
                color: white;
                text-decoration: none;
                border-radius: 0.25rem;
                font-size: 1.25rem;
                margin-top: 1.25rem;
            }
    
            .btn:hover {
                background-color: #DD6B20;
            }
    
            .text-muted {
                color: #718096;
            }
        </style>
    
        <main class="main">
            <div class="card">
                <h1>MatchMaster</h1>
                <p>Hola ${nombre}, bienvenido a MatchMaster</p>
                <p>Confirma tu cuenta haciendo click en el siguiente enlace</p>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}" class="btn">Comprobar cuenta</a>
    
                <p class="text-muted">Si no creaste esta cuenta, ignora este mensaje.</p>
            </div>
        </main>
    </body>
    </html>
            

        `

  })
}

const emailRecuperarPassword = async (datos) => {

    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5c73a16264e257",
        pass: "b0b35da0d73cce"
      }
    
        // service: "gmail",
        // auth: {
        //   user: "estudiaconofort@gmail.com",
        //   pass: "iwmjexmtnnicglsr"
        // }
      });
    
    
      //informacion del email
      const info = await transport.sendMail({
        from: '"EstudiaConfort - Conoce tu nueva habitación" <cuentas@estudiaconfort.com>',
        to: email,
        subject: 'EstudiaConfort - Confirma tu cuenta!',
        text: 'Bienvenido a Estudia Confort, confirma tu cuenta',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
        
                .main {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    justify-content: center;
                    background-color: #F97316;
                    padding: 1.25rem;
                }
        
                .card {
                    background-color: white;
                    border-radius: 0.75rem;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
        
                h1 {
                    font-size: 2.5rem;
                    font-weight: bold;
                }
        
                p {
                    font-size: 1.25rem;
                    color: #4A5568;
                    margin: 0.625rem 0;
                }
        
                .btn {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background-color: #F97316;
                    color: white;
                    text-decoration: none;
                    border-radius: 0.25rem;
                    font-size: 1.25rem;
                    margin-top: 1.25rem;
                }
        
                .btn:hover {
                    background-color: #DD6B20;
                }
        
                .text-muted {
                    color: #718096;
                }
            </style>
        
            <main class="main">
                <div class="card">
                    <h1>MatchMaster</h1>
                    <p>Hola ${nombre}, Cambia tu contraseña!</p>
                    <p>Lamentamos la perdida de tu contraseña, da click en el siguiente enlace para actualizarla</p>
                    <a href="${process.env.FRONTEND_URL}/update-password/${token}" class="btn">Cambiar contraseña</a>
        
                    <p class="text-muted">Si no cambiaste tu contraseña, ignora este mensaje.</p>
                </div>
            </main>
        </body>
        </html>
                
    
            `
    
      })

}

export {
    emailRegistro,
    emailRecuperarPassword
}