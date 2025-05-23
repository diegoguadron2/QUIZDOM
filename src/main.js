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
                {
                    question: "3. ¿Cuál atributo se usa para especificar la dirección de una imagen en HTML?",
                    options: [
                        { text: "src", correct: true },
                        { text: "href", correct: false },
                        { text: "link", correct: false },
                        { text: "alt", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! El atributo 'src' indica la ubicación de la imagen.",
                        incorrect: "Incorrecto. El atributo correcto es 'src'."
                    }
                },
                {
                    question: "4. ¿Qué etiqueta define un campo de entrada en un formulario?",
                    options: [
                        { text: "<form>", correct: false },
                        { text: "<field>", correct: false },
                        { text: "<input>", correct: true },
                        { text: "<text>", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! <input> define un campo de entrada.",
                        incorrect: "Incorrecto. La etiqueta correcta es <input>."
                    }
                },
                {
                    question: "5. ¿Qué etiqueta se utiliza para crear un hipervínculo en HTML?",
                    options: [
                        { text: "<link>", correct: false },
                        { text: "<href>", correct: false },
                        { text: "<url>", correct: false },
                        { text: "<a>", correct: true }
                    ],
                    feedback: {
                        correct: "¡Correcto! La etiqueta <a> se usa para enlaces.",
                        incorrect: "Incorrecto. La etiqueta correcta es <a>."
                    }
                },
                {
                    question: "6. ¿Qué etiqueta se utiliza para insertar un salto de línea?",
                    options: [
                        { text: "<lb>", correct: false },
                        { text: "<br>", correct: true },
                        { text: "<break>", correct: false },
                        { text: "<newline>", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! <br> se usa para saltos de línea.",
                        incorrect: "Incorrecto. La etiqueta correcta es <br>."
                    }
                }
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
                },
                {
                    question: "3. ¿Cuál de los siguientes es un bucle en JavaScript?",
                    options: [
                        { text: "repeat", correct: false },
                        { text: "while", correct: true },
                        { text: "loop", correct: false },
                        { text: "iterate", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! while es una estructura de bucle en JavaScript.",
                        incorrect: "Incorrecto. El bucle correcto es while."
                    }
                },
                {
                    question: "4. ¿Qué método convierte una cadena a número en JavaScript?",
                    options: [
                        { text: "toNumber()", correct: false },
                        { text: "parseString()", correct: false },
                        { text: "parseInt()", correct: true },
                        { text: "stringToNum()", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! parseInt() convierte una cadena a número entero.",
                        incorrect: "Incorrecto. El método correcto es parseInt()."
                    }
                },
                {
                    question: "5. ¿Qué método se usa para agregar un elemento al final de un arreglo?",
                    options: [
                        { text: "add()", correct: false },
                        { text: "append()", correct: false },
                        { text: "insert()", correct: false },
                        { text: "push()", correct: true }
                    ],
                    feedback: {
                        correct: "¡Correcto! push() agrega un elemento al final de un arreglo.",
                        incorrect: "Incorrecto. El método correcto es push()."
                    }
                },
                {
                    question: "6. ¿Qué operador lógico se usa para 'y' en JavaScript?",
                    options: [
                        { text: "||", correct: false },
                        { text: "&&", correct: true },
                        { text: "&", correct: false },
                        { text: "and", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! El operador lógico 'y' es &&.",
                        incorrect: "Incorrecto. El operador correcto es &&."
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
                },
                {
                    question: "3. ¿Qué propiedad se usa para definir un contenedor como grid en CSS?",
                    options: [
                        { text: "display: block;", correct: false },
                        { text: "display: flex;", correct: false },
                        { text: "display: grid;", correct: true },
                        { text: "position: grid;", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! Para activar Grid se usa 'display: grid;'.",
                        incorrect: "Incorrecto. La propiedad correcta es 'display: grid;'."
                    }
                },
                {
                    question: "4. ¿Cuál es la propiedad para cambiar el tamaño de fuente en CSS?",
                    options: [
                        { text: "font-size", correct: true },
                        { text: "font-style", correct: false },
                        { text: "font-weight", correct: false },
                        { text: "text-size", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! 'font-size' ajusta el tamaño de la fuente.",
                        incorrect: "Incorrecto. La propiedad correcta es 'font-size'."
                    }
                },
                {
                    question: "5. ¿Qué selector se usa para aplicar estilos a un elemento con un ID?",
                    options: [
                        { text: ".", correct: false },
                        { text: "#", correct: true },
                        { text: "*", correct: false },
                        { text: "/", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! El símbolo '#' se usa para seleccionar un ID.",
                        incorrect: "Incorrecto. Se usa '#' para seleccionar elementos por ID."
                    }
                },
                {
                    question: "6. ¿Cuál propiedad CSS controla el espacio exterior de un elemento?",
                    options: [
                        { text: "margin", correct: true },
                        { text: "padding", correct: false },
                        { text: "border", correct: false },
                        { text: "spacing", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto! 'margin' define el espacio exterior del elemento.",
                        incorrect: "Incorrecto. La propiedad correcta es 'margin'."
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
        Updateprogressbar(currentQuestionIndex);
    }

    // Cargar pregunta
    function loadQuestion(index) {
        // restartBtn.classList.add('d-none');

        if (index >= currentQuiz.questions.length) {
            const puntuacion = (score * 10) / currentQuiz.questions.length;
            questionText.textContent = `¡Quiz de ${currentQuiz.title} completado!\nTotal aciertos: ${score}/${currentQuiz.questions.length}\nPuntuación: ${puntuacion.toFixed(1)}/10`;
            resultadoTest.className = 'text-center';
            optionsContainer.innerHTML = '';
            feedbackContainer.classList.add('d-none');

            // regresamos a la primera vista para seleccionar los temas 
            backToThemesBtn.addEventListener('click', function() {
                quizContainer.classList.add('d-none');
                themeSelection.classList.remove('d-none');
            });backToThemesBtn.classList.remove('d-none');
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
    nextBtn.className = 'btn btn-primary w-100';
    nextBtn.style.height = '50px'
    nextBtn.addEventListener('click', function() {
        currentQuestionIndex++;
        Updateprogressbar(currentQuestionIndex);
        loadQuestion(currentQuestionIndex);
    });

    // Control de la barra de progreso
    function Updateprogressbar(pregunta) {
    let total = totalQuestionsSpan.textContent;
    const progreso = Math.round((pregunta / total) * 100);
    const progressBar = document.getElementById('quiz-progress-bar');
    progressBar.style.width = `${progreso}%`;
    progressBar.setAttribute('aria-valuenow', progreso);
    progressBar.textContent = `${progreso}%`;
    }
});