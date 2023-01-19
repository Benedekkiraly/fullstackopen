import courses from './components/courses'

const PartContent = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const App = () => {
 
  return( 
    <div>
    {courses.map((course) => (
    <div key={course.id}>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(parts => 
            <PartContent key={parts.id} part={parts}  />
        )}
      </ul>
      <h3>Total number of exercises: {course.parts.reduce((x, parts) => x + parts.exercises, 0)}</h3>
    </div>
    ))}
    </div>
  )
    }

export default App