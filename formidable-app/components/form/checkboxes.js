import React, { useState } from 'react';

export default function Checkboxes({updateForm, form, id, renderEditableText}) {

  const [ question, setQeustion ] = useState('Question');
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const renderOptions = form[id].options.map((option, i) => {
    return(
      <div key={i}>
        <input type='checkbox' name={id} id={i} disabled/>{option}
      </div>
    )
  });

  const addQuestion = (e) => {
    e.preventDefault();

    let newForm = [...form];
    newForm.splice(id+1, 0, {component: 'multChoice', question: 'Question', options: ['Option 1']})
    updateForm(newForm);
  };

  const addOption = (e) => {
    e.preventDefault();

    const nOptions = form[id].options.length;
    let newForm = [...form];
    newForm[id].options.push(`Option ${nOptions+1}`)
    updateForm(newForm);
  };

  const handleChange = (e) => {
    
    let newForm = [...form];
    newForm[id].component = e.target.value;
    if (e.target.value === 'text') {
      newForm[id].options = [null];
    }
    updateForm(newForm);
  };

  return(
    <div>
      <div>
        {renderEditableText(question, editingQuestion, setQeustion, setEditingQuestion)}
      </div>
      <div>
        <form>
          {renderOptions}
          <button onClick={addOption}>Add option</button>
        </form>
      </div>
      <div>
        <form>
          <select name='formType' id='formType' defaultValue={'checkboxes'} onChange={handleChange}>
            <option value='multChoice'>Multiple choice</option>
            <option value='checkboxes'>Checkboxes</option>
            <option value='dropdown'>Drop-down</option>
            <option value='text'>Text</option>
          </select>
          <br></br>
          <button onClick={addQuestion}>Add question</button>
        </form>
      </div>
    </div>
  )
}