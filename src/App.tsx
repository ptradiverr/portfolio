import './App.css'

function App() {
  return (
    <main>
      <section className="hero">
        <h1>hi, i'm ruibing</h1>
      </section>

      <section className="hero">
        <h1>i like to do many things:  <br /> </h1>
        <p>
          <a href="#reading">reading</a> (especially visual novels), networking,
          working out, gaming, cleaning (?)
        </p>
      </section>

      <section className="reading" id="reading">
        <h2>in no particular order: </h2>

        <p> Danganronpa, Science Adv (Steins;Gate, Chaos;Head, Robotics;Notes), Ace Attorney, Umineko </p>
      </section>
    </main>
  )
}

export default App