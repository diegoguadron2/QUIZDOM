 document.addEventListener('DOMContentLoaded', function() {
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
                    question: "Pregunta 1",
                    options: [
                        { text: "Correcto", correct: true },
                        { text: "Incorrecto", correct: false },
                        { text: "Incorrecto", correct: false },
                        { text: "Incorrecto", correct: false }
                    ],
                    feedback: {
                        correct: "¡Correcto!",
                        incorrect: "Incorrecto. "
                    }
                },
                {
                    question: "Pregunta 2",
                    options: [
                        { text: "Incorrecto", correct: false },
                        { text: "Incorrecto", correct: false },
                        { text: "Correcto", correct: true },
                        { text: "Incorrecto", correct: false }
                    ],
                    feedback: {
                        correct: "Correcto",
                        incorrect: "Incorrecto"
                    }
                },
                {
                    question: "Pregunta 3",
                    options: [
                        { text: "Incorrecto", correct: false },
                        { text: "Correcto", correct: true },
                        { text: "Incorrecto", correct: false },
                        { text: "Incorrecto", correct: false }
                    ],
                    feedback: {
                        correct: "Correcto.",
                        incorrect: "Incorrecto"
                    }
                }
            ];
            
            // Configurar el total de preguntas
            totalQuestionsSpan.textContent = quizData.length;
            
            let currentQuestionIndex = 0;
            let score = 0;
            
            // Cargar pregunta actual
            function loadQuestion(index) {
                // Ocultar botón de reinicio (si estaba visible)
                restartBtn.classList.add('d-none');
                
                if(index >= quizData.length) {
                    // Fin del quiz
                    questionText.textContent = `¡Quiz completado! Puntuación: ${score}/${quizData.length}`;
                    optionsContainer.innerHTML = '';
                    feedbackContainer.classList.add('d-none');
                    
                    // Mostrar botón de reinicio
                    restartBtn.classList.remove('d-none');
                    return;
                }
                // Cargar pregunta
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
                    if(btn.dataset.correct === 'true') {
                        btn.classList.remove('btn-outline-light');
                        btn.classList.add('btn-success');
                    }
                });
                
                const question = quizData[currentQuestionIndex];
                feedbackText.textContent = isCorrect ? question.feedback.correct : question.feedback.incorrect;
                
                if(isCorrect) {
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
            nextBtn.addEventListener('click', function() {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            });
            
            // Manejar reinicio del quiz
            restartBtn.addEventListener('click', function() {
                // Reiniciar variables de estado
                currentQuestionIndex = 0;
                score = 0;
                
                // Volver a cargar la primera pregunta
                loadQuestion(0);
            });
            
            // Iniciar quiz
            loadQuestion(0);
        });