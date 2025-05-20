
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const themeSelection = document.getElementById('theme-selection');
    const quizContainer = document.getElementById('quiz-container');
    const optionsContainer = document.getElementById('opciones-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackIcon = document.getElementById('feedback-icon');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const backToThemesBtn = document.getElementById('back-to-themes');
    const questionText = document.getElementById('pregunta-text');
    const currentQuestionSpan = document.getElementById('actual-pregunta');
    const totalQuestionsSpan = document.getElementById('total-preguntas');
    const resultadoTest = document.getElementById('resultadoTest');

    // Base de datos de quizzes
    const quizzes = {
        html: {
            title: "HTML",
            questions: [
                {
                    question: "1. ¿Qué significa HTML?",
                    options: [
                        { text: "Hyperlinks and Text Markup Language", correct: false },
                        { text: "Home Tool Markup Language", correct: false },
                        { text: "Hyper Text Markup Language", correct: true },
                        { text: "Hyper Text Making Language", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! HTML significa Hyper Text Markup Language.",
                        incorrect: "Incorrecto. HTML significa Hyper Text Markup Language."
                    }
                },
                {
                    question: "2. ¿Cuál es el elemento raíz de un documento HTML?",
                    options: [
                        { text: "<body>", correct: false },
                        { text: "<head>", correct: false },
                        { text: "<html>", correct: true },
                        { text: "<!DOCTYPE>", correct: false }
                    ],
                    feedback: {
                        correct: "Correcto. <html> es el elemento raíz que contiene todo el documento.",
                        incorrect: "Incorrecto. El elemento raíz es <html>."
                    }
                },
            ]
        },
        javascript: {
            title: "JavaScript",
            questions: [
                {
                    question: "1. ¿Qué método se usa para seleccionar un elemento por su ID?",
                    options: [
                        { text: ".querySelectorAll()", correct: false },
                        { text: ".getElementsByClassName()", correct: false },
                        { text: ".getElementById()", correct: true },
                        { text: ".getTagName()", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! getElementById permite seleccionar un elemento único por su ID.",
                        incorrect: "Incorrecto. La forma correcta es document.getElementById()."
                    }
                },
                {
                    question: "2. ¿Qué propiedad se usa para modificar el contenido HTML de un elemento?",
                    options: [
                        { text: ".innerHTML", correct: true },
                        { text: ".value", correct: false },
                        { text: ".htmlContent", correct: false },
                        { text: ".text()", correct: false }
                    ],
                    feedback: {
                        correct: "Correcto. innerHTML te permite cambiar el contenido de un elemento.",
                        incorrect: "Incorrecto. La propiedad correcta es innerHTML."
                    }
                }
            ]
        },
        css: {
            title: "CSS",
            questions: [
                {
                    question: "1. ¿Qué significa CSS?",
                    options: [
                        { text: "Computer Style Sheets", correct: false },
                        { text: "Creative Style Sheets", correct: false },
                        { text: "Cascading Style Sheets", correct: true },
                        { text: "Colorful Style Sheets", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! CSS significa Cascading Style Sheets.",
                        incorrect: "Incorrecto. CSS significa Cascading Style Sheets."
                    }
                },
                {
                    question: "2. ¿Cuál es la propiedad CSS para cambiar el color del texto?",
                    options: [
                        { text: "text-color", correct: false },
                        { text: "font-color", correct: false },
                        { text: "text-style", correct: false },
                        { text: "color", correct: true }
                    ],
                    feedback: {
                        correct: "Correcto. La propiedad 'color' cambia el color del texto.",
                        incorrect: "Incorrecto. La propiedad correcta es 'color'."
                    }
                }
            ]
        }
    };

    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let score = 0;

    // Manejar selección de tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            currentQuiz = quizzes[theme];
            startQuiz();
        });
    });

    // Iniciar quiz
    function startQuiz() {
        themeSelection.classList.add('d-none');
        quizContainer.classList.remove('d-none');

        // Resetear estructura de columnas
        resultadoTest.classList.remove('text-center');
        resultadoTest.className = 'col-lg-6 py-md-4';

        totalQuestionsSpan.textContent = currentQuiz.questions.length;
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion(currentQuestionIndex);
    }

    // Cargar pregunta
    function loadQuestion(index) {
        restartBtn.classList.add('d-none');

        if (index >= currentQuiz.questions.length) {
            const puntuacion = (score * 10) / currentQuiz.questions.length;
            questionText.textContent = `¡Quiz de ${currentQuiz.title} completado!\nTotal aciertos: ${score}/${currentQuiz.questions.length}\nPuntuación: ${puntuacion.toFixed(1)}/10`;
            resultadoTest.className = 'text-center';
            optionsContainer.innerHTML = '';
            feedbackContainer.classList.add('d-none');
            restartBtn.classList.remove('d-none');
            return;
        }

        const question = currentQuiz.questions[index];
        questionText.textContent = question.question;
        currentQuestionSpan.textContent = index + 1;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, i) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-light text-start py-3 flex items-center w-100 px-2';

            const letra = String.fromCharCode(65 + i);
            const spanLetra = document.createElement('span');
            spanLetra.textContent = letra;
            spanLetra.className = 'rounded-1 px-3 py-2 bg-white text-primary fw-bold me-2';

            btn.appendChild(spanLetra);
            btn.appendChild(document.createTextNode(option.text));

            btn.dataset.correct = option.correct;
            btn.addEventListener('click', selectOption);
            optionsContainer.appendChild(btn);
        });

        feedbackContainer.classList.add('d-none');
    }

    // Manejar selección de respuesta
    function selectOption(e) {
        const selectedBtn = e.target.closest('button');
        if (!selectedBtn) return;

        const isCorrect = selectedBtn.dataset.correct === 'true';

        // Deshabilitar todas las opciones
        document.querySelectorAll('#opciones-container button').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.remove('btn-outline-light');
                btn.classList.add('btn-success');
            }
        });

        // Mostrar feedback
        const question = currentQuiz.questions[currentQuestionIndex];
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

    // Siguiente pregunta
    nextBtn.addEventListener('click', function() {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    });

    // Reiniciar quiz
    restartBtn.addEventListener('click', function() {
        startQuiz();
    });

    // Volver a temas
    backToThemesBtn.addEventListener('click', function() {
        quizContainer.classList.add('d-none');
        themeSelection.classList.remove('d-none');
    });
});