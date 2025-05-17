document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const optionsContainer = document.getElementById('opciones-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackIcon = document.getElementById('feedback-icon');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('pregunta-text');
    const currentQuestionSpan = document.getElementById('actual-pregunta');
    const totalQuestionsSpan = document.getElementById('total-preguntas');

    // Datos del quiz
    const quizData = [
        {
            question: "1. ¿Qué método se usa para seleccionar un elemento por su ID?",
            options: [
                { text: "document.querySelectorAll()", correct: false },
                { text: "document.getElementsByClassName()", correct: false },
                { text: "document.getElementById()", correct: true },
                { text: "document.getTagName()", correct: false }
            ],
            feedback: {
                correct: "¡Correcto! getElementById permite seleccionar un elemento único por su ID.",
                incorrect: "Incorrecto. La forma correcta es document.getElementById()."
            }
        },
        {
            question: "2. ¿Qué propiedad se usa para modificar el contenido HTML de un elemento?",
            options: [
                { text: "innerHTML", correct: true },
                { text: "value", correct: false },
                { text: "htmlContent", correct: false },
                { text: "text()", correct: false }
            ],
            feedback: {
                correct: "Correcto. innerHTML te permite cambiar el contenido de un elemento.",
                incorrect: "Incorrecto. La propiedad correcta es innerHTML."
            }
        },
        {
            question: "3. ¿Qué evento se activa cuando un usuario hace clic en un elemento?",
            options: [
                { text: "hover", correct: false },
                { text: "keydown", correct: false },
                { text: "click", correct: true },
                { text: "submit", correct: false }
            ],
            feedback: {
                correct: "Correcto. El evento 'click' detecta cuando se hace clic.",
                incorrect: "Incorrecto. El evento correcto es 'click'."
            }
        },
        {
            question: "4. ¿Cómo se agrega un nuevo elemento al DOM?",
            options: [
                { text: "document.createElement() seguido de appendChild()", correct: true },
                { text: "Mediante alert()", correct: false },
                { text: "Con setTimeout()", correct: false },
                { text: "Usando innerText", correct: false }
            ],
            feedback: {
                correct: "Correcto. Se debe crear y luego insertar el nuevo nodo.",
                incorrect: "Incorrecto. Debes crear el elemento y luego agregarlo con appendChild."
            }
        },
        {
            question: "5. ¿Qué método selecciona todos los elementos que coinciden con un selector CSS?",
            options: [
                { text: "getElementById()", correct: false },
                { text: "querySelectorAll()", correct: true },
                { text: "getElementByTag()", correct: false },
                { text: "querySelector()", correct: false }
            ],
            feedback: {
                correct: "¡Correcto! querySelectorAll devuelve todos los elementos que coincidan.",
                incorrect: "Incorrecto. La respuesta correcta es querySelectorAll()."
            }
        },
        {
            question: "6. ¿De qué manera puedes detectar que un botón ha sido presionado?",
            options: [
                { text: "eventClick()", correct: false },
                { text: "addEventListener()", correct: true },
                { text: "triggerEvent()", correct: false },
                { text: "alert()", correct: false }
            ],
            feedback: {
                correct: "Correcto. addEventListener es la forma estándar.",
                incorrect: "Incorrecto. La forma correcta es usando addEventListener()."
            }
        },
        {
            question: "7. ¿Qué propiedad se usa para acceder o cambiar el valor de un input?",
            options: [
                { text: "inputText", correct: false },
                { text: "textContent", correct: false },
                { text: "innerHTML", correct: false },
                { text: "value", correct: true }
            ],
            feedback: {
                correct: "Correcto. La propiedad 'value' permite leer o cambiar el contenido de un input.",
                incorrect: "Incorrecto. La propiedad correcta es 'value'."
            }
        },
        {
            question: "8. ¿Qué método se utiliza para recorrer cada elemento de un arreglo en JavaScript?",
            options: [
                { text: "inputText", correct: false },
                { text: "forEach", correct: true },
                { text: "innerHTML", correct: false },
                { text: "value", correct: false }
            ],
            feedback: {
                correct: "Correcto. El método forEach permite recorrer todos los elementos de un arreglo.",
                incorrect: "Incorrecto. La forma correcta de recorrer un arreglo es usando el método forEach."
            }
        },
        {
            question: "9. ¿Cuál es el evento que se activa cuando el valor de un elemento de formulario cambia?",
            options: [
                { text: "onchange", correct: true },
                { text: "onclick", correct: false },
                { text: "onload", correct: false },
                { text: "onsubmit", correct: false }
            ],
            feedback: {
                correct: "Correcto. El evento 'onchange' se activa cuando se modifica el valor de un elemento.",
                incorrect: "Incorrecto. El evento correcto es 'onchange'."
            }
        },
        {
            question: "10. ¿Para qué se utilizan las Media Queries en CSS?",
            options: [
                { text: "Para declarar variables en hojas de estilo", correct: false },
                { text: "Para aplicar estilos según el tipo y tamaño de pantalla del dispositivo", correct: true },
                { text: "Para crear animaciones con JavaScript", correct: false },
                { text: "Para cambiar el contenido HTML desde CSS", correct: false }
            ],
            feedback: {
                correct: "Correcto. Las Media Queries permiten aplicar estilos condicionales según el tamaño o características del dispositivo.",
                incorrect: "Incorrecto. Las Media Queries se usan para adaptar el diseño al tamaño de pantalla o dispositivo."
            }
        },
        {
            question: "11. ¿Cuál es la diferencia principal entre las palabras clave 'let' y 'const' en JavaScript?",
            options: [
                { text: "'let' no permite reasignar el valor, pero 'const' sí", correct: false },
                { text: "'const' se puede usar solo dentro de funciones, 'let' no", correct: false },
                { text: "'let' declara una variable que puede cambiar, 'const' declara una constante que no cambia", correct: true },
                { text: "Ambas se usan para declarar funciones, no variables", correct: false }
            ],
            feedback: {
                correct: "Correcto. 'let' permite reasignar el valor, mientras que 'const' define una constante que no se puede cambiar.",
                incorrect: "Incorrecto. La respuesta correcta es que 'let' permite cambios y 'const' define valores que no deben cambiar."
            }
        },
        {
            question: "12. ¿Cuál de las siguientes es una estructura de bucle en JavaScript?",
            options: [
                { text: "if", correct: false },
                { text: "switch", correct: false },
                { text: "try", correct: false },
                { text: "for", correct: true }
            ],
            feedback: {
                correct: "Correcto. 'for' es una estructura de bucle que permite repetir un bloque de código varias veces.",
                incorrect: "Incorrecto. La respuesta correcta es 'for', que se utiliza para repetir instrucciones en un ciclo."
            }
        }
    ];

    // Configurar el total de preguntas
    totalQuestionsSpan.textContent = quizData.length;

    let currentQuestionIndex = 0;
    let score = 0;

    // Cargar pregunta actual
    function loadQuestion(index) {
        restartBtn.classList.add('d-none');

        if (index >= quizData.length) {
            questionText.textContent = `¡Quiz completado! Puntuación: ${score}/${quizData.length}`;
            optionsContainer.innerHTML = '';
            feedbackContainer.classList.add('d-none');
            restartBtn.classList.remove('d-none');
            return;
        }

        const question = quizData[index];
        questionText.textContent = question.question;
        currentQuestionSpan.textContent = index + 1;

        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-light text-start py-2';
            btn.textContent = option.text;
            btn.dataset.correct = option.correct;
            btn.addEventListener('click', selectOption);
            optionsContainer.appendChild(btn);
        });

        feedbackContainer.classList.add('d-none');
    }

    // Manejar selección de opción
    function selectOption(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';

        document.querySelectorAll('#opciones-container button').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.remove('btn-outline-light');
                btn.classList.add('btn-success');
            }
        });

        const question = quizData[currentQuestionIndex];
        feedbackText.textContent = isCorrect ? question.feedback.correct : question.feedback.incorrect;

        if (isCorrect) {
            feedbackMessage.className = 'alert alert-success d-flex align-items-center mb-3';
            feedbackIcon.innerHTML = '✓';
            score++;
        } else {
            feedbackMessage.className = 'alert alert-danger d-flex align-items-center mb-3';
            feedbackIcon.innerHTML = '✗';
            selectedBtn.classList.remove('btn-outline-light');
            selectedBtn.classList.add('btn-danger');
        }

        feedbackContainer.classList.remove('d-none');
    }

    // Manejar siguiente pregunta
    nextBtn.addEventListener('click', function () {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    });

    // Manejar reinicio del quiz
    restartBtn.addEventListener('click', function () {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion(0);
    });

    // Iniciar quiz
    loadQuestion(0);
});
