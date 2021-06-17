
module.exports = (req, res) => {
    res.send(`
        <h1>Bonjour</h1>
        <a href="/">Home</a>
        <form action="/login" method="post" enctype="application/json">
            <input type="text" name="name" id="name" placeholder="username" />
            <input type="text" name="password" id="password" placeholder="password" />
            <input type="submit" value="Envoyer" />
        </form>
        <script>
            document.querySelector('form').addEventListener('submit', e => {
                e.preventDefault();
                
                const body = {
                      name: document.getElementById('name').value,
                      password: document.getElementById('password').value
                  };

                fetch("http://localhost:3000/login", {
                  "method": "POST",
                  "headers": {
                    "Content-Type": "application/json"
                  },
                  "body": JSON.stringify(body)
                })
                .then((reponse) => reponse.json())
                .then(response => {
                    console.log(response)
                    if(response !== "error") {
                        document.location.href="http://localhost:3000/";
                    }
                })
                .catch(err => {
                  console.error(err);
                });
            })
        </script>
   `);
};

