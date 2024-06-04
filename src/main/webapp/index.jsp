<%
if(session.getAttribute("name")==null){
	response.sendRedirect("login.jsp");
}
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Home Page</title>
<style type="text/css">
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #333;
  padding: 1rem;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
}

.navbar-nav {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-nav li {
  margin-left: 1rem;
}

.navbar-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
}

.hero-section {
  background: url('https://s3-alpha.figma.com/hub/file/3271720301/85f5595b-9b58-45c2-a189-8354dfc6a3fe-cover.png') no-repeat center center/cover;
  color: #fff;
  text-align: center;
  padding: 16rem 2rem;
}

.hero-section .container {
  max-width: 600px;
  margin: 0 auto;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.btn {
  background-color: #007BFF;
  color: #fff;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
}

.btn:hover {
  background-color: #0056b3;
}

</style>
</body>


  <nav class="navbar">
    <div class="container">
      <a href="#" class="navbar-brand">Film Fantasy</a>
      <ul class="navbar-nav">
        <li><a href="search.html">Search</a></li>
          <li><a href="logout">Logout</a></li>
          <li><a href="index.jsp"><%=session.getAttribute("name")%></a></li>
     </ul>
    </div>
  </nav>
  
  <header id="home" class="hero-section">
    <div class="container">
      
    </div>
  </header>
  
  <!-- Autres sections ici -->


</html>