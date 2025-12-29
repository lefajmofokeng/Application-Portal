let currentStep = 1;

        function updateProgress() {
            const steps = document.querySelectorAll('.step');
            const progressFill = document.getElementById('progressFill');
            
            steps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'completed');
                
                if (stepNum < currentStep) {
                    step.classList.add('completed');
                } else if (stepNum === currentStep) {
                    step.classList.add('active');
                }
            });

            const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;
            progressFill.style.width = progressPercent + '%';
        }

        function showStep(step) {
            document.querySelectorAll('.step-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById('step' + step).classList.add('active');
            currentStep = step;
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function nextStep() {
            if (currentStep < 3) {
                showStep(currentStep + 1);
            }
        }

        function previousStep() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        }

        function validateAndNext() {
            const form = document.getElementById('applicationForm');
            if (form.checkValidity()) {
                nextStep();
            } else {
                form.reportValidity();
            }
        }

        document.getElementById('termsAgree').addEventListener('change', function() {
            document.getElementById('submitBtn').disabled = !this.checked;
        });

        function submitApplication() {
            const termsChecked = document.getElementById('termsAgree').checked;
            
            if (!termsChecked) {
                alert('Please agree to the terms and conditions to proceed.');
                return;
            }

            document.querySelectorAll('.step-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById('success').classList.add('active');
            
            const steps = document.querySelectorAll('.step');
            steps.forEach(step => {
                step.classList.remove('active');
                step.classList.add('completed');
            });
            document.getElementById('progressFill').style.width = '100%';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        updateProgress();