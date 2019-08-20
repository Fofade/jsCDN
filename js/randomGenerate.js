$(document).ready(
    function() {
        $('#randomGenerate').click(
            function () {
                var test_1 = /^\d+$/.test($('#randomCount').val());
                var test_2 = /^\d+$/.test($('#randomMinimum').val());
                var test_3 = /^\d+$/.test($('#randomMaximum').val());
                if (
                    test_1 != true ||
                    test_2 != true ||
                    test_3 != true
                ) {
                    $('#randomNumbers').html('You missed something, please check the values above...');
                } else if (
                    parseInt($('#randomCount').val()) < 1
                ) {
                    $('#randomNumbers').html('The count value have to be at least 1...');
                } else if (
                    parseInt($('#randomMinimum').val()) < 0
                ) {
                    $('#randomNumbers').html('The minimum value have to be at least 0...');
                } else if (
                    parseInt($('#randomMaximum').val()) < 1
                ) {
                    $('#randomNumbers').html('The maximum value have to be at least 1...');
                } else if (
                    parseInt($('#randomMaximum').val()) <= parseInt($('#randomMinimum').val())
                ) {
                    $('#randomNumbers').html('The maximum value have to be greater then the minimum...');
                } else if (
                    $('#randomType').val() == 'unique' &&
                    parseInt($('#randomCount').val()) > ( parseInt($('#randomMaximum').val()) - parseInt($('#randomMinimum').val()) )
                ) {
                    $('#randomNumbers').html('In a unique sequence: count <= ( maximum - minimum )...');
                } else {
                    var mTwister = new MersenneTwister();
                    var randomNumbers = new Array();
                    for (
                        var i = 0;
                        i < parseInt($('#randomCount').val());
                        i++
                    ) {
                        var number = ( Math.round( mTwister.random() * ( parseInt($('#randomMaximum').val()) - parseInt($('#randomMinimum').val()) ) ) + parseInt($('#randomMinimum').val()) );
                        var found  = false;
                        for (
                            var j = 0;
                            j < randomNumbers.length;
                            j++
                        ) {
                            if (
                                randomNumbers[j] == number
                            ) {
                                found = true;
                                break;
                            }
                        }
                        if (
                            found == true &&
                            $('#randomType').val() == 'unique'
                        ) {
                            i--;
                        } else {
                            randomNumbers[i] = number;
                        }
                    }
                    $('#randomNumbers').html('');
                    for (
                        var i = 0;
                        i < randomNumbers.length;
                        i++
                    ) {
                        $('#randomNumbers').html($('#randomNumbers').html() + ( i == 0 ? '' : ' ' ) + '<b>' + randomNumbers[i] + '</b>');
                    }
                }
            }
        );
    }
);