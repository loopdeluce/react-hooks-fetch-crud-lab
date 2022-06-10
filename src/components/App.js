import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(questions => {
      setQuestions(questions);
    })
  }, [])

  function handleNewQuestion(newQuestion){
    setQuestions(questions => [...questions, newQuestion]);
  }

  function handleDeleteQuestion(question){
    const updatedArray = questions.filter(existingq => existingq.id !==question.id);
    setQuestions(updatedArray);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
      ? <QuestionForm onNewQuestion={handleNewQuestion}/> 
      : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
