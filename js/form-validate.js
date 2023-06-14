$().ready(function () {
    /*$.validator.addMethod("greaterThan",
     function (value, element, param) {
     var $min = $(param);
     if (this.settings.onfocusout) {
     $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
     $(element).valid();
     });
     }
     return parseInt(value) > parseInt($min.val());
     }, "Max must be greater than min");*/
    $('#contact-form').validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            msg: "required"
        },
        messages: {
            name: {
                required: "Required: Please enter a valid number"
            },
            email: {
                required: "Required in this field",
                email: "Please enter a valid email"
            },
            msg: {
                required: "Required: Please enter a valid number"
            }
        }
    });
    /* Prevents form from submitting if there is an error */
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        var status = $('#contact-form').validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                msg: "required"
            },
            messages: {
                name: {
                    required: "Required: Please enter a valid number"
                },
                email: {
                    required: "Required in this field",
                    email: "Please enter a valid email"
                },
                msg: {
                    required: "Required: Please enter a valid number"
                }
            }
        });
        status = status.currentForm;

        /* Check for error and focus on if there is one */
        if (status[0].inVal !== 'error' && status[1].className !== 'error' && status[2].inVal !== 'error' && status[3].inVal !== 'error') {
            mulTab();
        } else {
            if (status[0].inVal === 'error') {
                document.getElementById("name").focus();
            }
            if (status[1].inVal === 'error') {
                document.getElementById("email").focus();
            }
            if (status[2].inVal === 'error') {
                document.getElementById("msg").focus();
            }
        }
    });
    //Adds focus to the input boxes
    $("input").focus(function () {
        $(this).next("span").css("display", "inline");
    });

});