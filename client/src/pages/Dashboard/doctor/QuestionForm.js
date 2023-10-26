import React, { useEffect, useState } from 'react'
import qesForm from '../../../Styles/Dashboard/doctor/QuestionForm.module.css'
import { useDispatch } from 'react-redux'
import { addQuestionUThunk, getQuestionType } from '../../../store/questionActions';



const QuestionForm = (props) => {
    const dispatch = useDispatch();
    const [trueORFalse, setTrueORFalse] = useState('')
    const [multipleChoices, setMultipleChoices] = useState({
        status: false,
        data: {
            type: 'multiple_choice',
            question: '',
            correctAnswer: '',
            options: ['', '', '', ''],
            lectureNumber: 0
        }
    })
    const [trueFalse, setTrueFalse] = useState({
        status: false,
        data: {
            type: 'true_false',
            question: '',
            correctAnswer: '',
            options: ['true', 'false'],
            lectureNumber: 0
        }
    })
    const [openEnded, setOpenEnded] = useState({
        status: false,
        data: {
            type: 'open_ended',
            question: '',
            correctAnswer: '',
            lectureNumber: 0
        }
    })

    const TypeIsSelected = (setSelectedChoice, choiceData) => {
        if (multipleChoices.status === true) {
            setMultipleChoices({ ...multipleChoices, status: false })
        } else if (trueFalse.status) {
            setTrueFalse({ ...trueFalse, status: false })
        } else if (openEnded.status) {
            setOpenEnded({ ...openEnded, status: false })
        }
        props.setAddQuestion(false)
        setSelectedChoice({ ...choiceData, status: true })
        dispatch(getQuestionType(choiceData.data.type))
        props.setchoised(true)
    }

    const handleMultipleChange = (e, setType, type) => {
        const { name, value } = e.target;
        setType({ ...type, data: { ...type.data, [name]: value, lectureNumber: props.lectureNum } })
    }


    useEffect(() => {
        if (trueFalse.status) {
            setTrueFalse({
                ...trueFalse,
                data: {
                    ...trueFalse.data, correctAnswer: trueORFalse
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trueORFalse])

    const handleOptions = (e, index) => {
        const option = multipleChoices.data.options.map((option, i) => {
            if (i === index) {
                option = e.target.value;
            }
            return option;
        });
        setMultipleChoices({
            ...multipleChoices,
            data: {
                ...multipleChoices.data,
                options: option
            }
        })
    }


    console.log(multipleChoices)
    console.log(trueFalse)
    console.log(openEnded)


    const handleSubmit = (e, data) => {
        e.preventDefault();
        dispatch(addQuestionUThunk(data))
        props.setAddQuestion(false)
        props.setchoised(false)
        props.setQuestionIsAdded(!props.questionIsAdded)
    }

    console.log(props.lectureNum)

    return (
        <div>
            {
                props.addQuestion && (
                    <div className={qesForm.selectType}>
                        <h2>Question Type</h2>
                        <ul>
                            <li onClick={() => TypeIsSelected(setMultipleChoices, multipleChoices)}>Multiple Choices</li>
                            <li onClick={() => TypeIsSelected(setTrueFalse, trueFalse)}>True Or False</li>
                            <li onClick={() => TypeIsSelected(setOpenEnded, openEnded)}>Open Ended</li>
                        </ul>
                    </div>
                )
            }
            {
                props.choised && multipleChoices.status ? (
                    <form className={qesForm.addQuestion} onSubmit={(e) => handleSubmit(e, multipleChoices.data)}>
                        <input
                            type='text'
                            placeholder='Question Here'
                            name='question'
                            onChange={(e) => handleMultipleChange(e, setMultipleChoices, multipleChoices)}
                            className={qesForm.question}
                            required
                        />
                        <p>type: {multipleChoices.data.type}</p>
                        <ul>
                            {
                                multipleChoices.data.options.map((option, index) => (
                                    <li key={index}>
                                        <input
                                            type='text'
                                            placeholder='Choice'
                                            onChange={(e) => handleOptions(e, index)}
                                            required
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                        <select
                            name='correctAnswer'
                            onChange={(e) => handleMultipleChange(e, setMultipleChoices, multipleChoices)}
                            required
                        >
                            <option selected disabled>Correct Answer</option>
                            {
                                multipleChoices.data.options.map((option) => (
                                    <option
                                        name='correctAnswer'
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))
                            }
                        </select>
                        <button type='submit'>Add</button>
                    </form>
                ) : (
                    props.choised && trueFalse.status ? (
                        <form className={qesForm.addQuestion} onSubmit={(e) => handleSubmit(e, trueFalse.data)}>
                            <input
                                type='text'
                                placeholder='Question Here'
                                name='question'
                                onChange={(e) => handleMultipleChange(e, setTrueFalse, trueFalse)}
                                className={qesForm.question}
                                required
                            />
                            <p>type: {trueFalse.data.type}</p>
                            <ul>
                                {
                                    trueFalse.data.options.map((option, index) => (
                                        <li key={index}>
                                            <label name={option} id={option} className={qesForm.truOrFalse}>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value={option}
                                                    id={option}
                                                    onChange={(e) => setTrueORFalse(e.target.value)}
                                                    required
                                                />
                                                <p>{option}</p>
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                            <input
                                type='text'
                                placeholder='Correct Answer'
                                name='correctAnswer'
                                className={qesForm.corrAnswer}
                                value={trueORFalse}
                                disabled
                            />
                            <button type='submit'>Add</button>
                        </form>
                    ) : (
                        props.choised && openEnded.status ? (
                            <form className={qesForm.addQuestion} onSubmit={(e) => handleSubmit(e, openEnded.data)}>
                                <input
                                    type='text'
                                    placeholder='Question Here'
                                    name='question'
                                    className={qesForm.question}
                                    onChange={(e) => handleMultipleChange(e, setOpenEnded, openEnded)}
                                    required
                                />
                                <p>type: {openEnded.data.type}</p>
                                <textarea
                                    placeholder='Answer'
                                    name="correctAnswer"
                                    className={qesForm.openEnded}
                                    onChange={(e) => handleMultipleChange(e, setOpenEnded, openEnded)}
                                    required
                                ></textarea>
                                <button type='submit'>Add</button>
                            </form>
                        ) : (
                            ''
                        )
                    )
                )
            }
        </div>
    )
}

export default QuestionForm