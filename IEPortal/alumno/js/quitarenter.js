document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                console.log('no hay enter')
                return false;
            }
            
        });