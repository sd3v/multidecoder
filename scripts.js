$(document).ready(function() {
  const inputField = document.getElementById('inputString');
  const modeSwitch = document.getElementById('modeSwitch');
  const algorithmsSelect = $('#algorithmsSelect');

  // TODO let User choose this
  const password = "mysecretpassword";

  // Initialize Select2
  algorithmsSelect.select2({
    placeholder: "Select encryption algorithms",
    allowClear: true
  });

  // Default all options selected
  algorithmsSelect.val(algorithmsSelect.find('option').map(function() {
    return this.value;
  }).get()).trigger('change');

  // Load stored algorithms from localStorage
  const storedAlgorithms = JSON.parse(localStorage.getItem('selectedAlgorithms')) || [];
  if (storedAlgorithms.length > 0) {
    algorithmsSelect.val(storedAlgorithms).trigger('change');
  }

  // Save selected algorithms to localStorage on change
  algorithmsSelect.on('change', function() {
    const selectedAlgorithms = algorithmsSelect.val();
    localStorage.setItem('selectedAlgorithms', JSON.stringify(selectedAlgorithms));
    processInput();
  });

  // Process input when user types in the text field or switches encode/decode
  inputField.addEventListener('input', processInput);
  modeSwitch.addEventListener('change', processInput);

  function processInput() {
    const inputString = inputField.value;
    const mode = modeSwitch.checked ? 'Encode' : 'Decode';
    const selectedAlgorithms = algorithmsSelect.val();

    // Check if the input is empty
    if (!inputString) {
      console.log("No input string provided.");
      return;
    }

    console.log("Processing in mode:", mode);
    console.log("Selected Algorithms:", selectedAlgorithms);

    let results = {};

    // Process encoding or decoding based on selected algorithms
    if (mode === 'Encode') {
      if (selectedAlgorithms.includes('Base64')) {
        results['Base64 Encode'] = btoa(inputString);
        console.log('Base64 Encode processed');
      }
      if (selectedAlgorithms.includes('ROT13')) {
        results['ROT13'] = rot13(inputString);
        console.log('ROT13 processed');
      }
      if (selectedAlgorithms.includes('Hex')) {
        results['Hexadecimal Encode'] = toHex(inputString);
        console.log('Hexadecimal Encode processed');
      }
      if (selectedAlgorithms.includes('ASCII')) {
        results['ASCII Encode'] = toAscii(inputString);
        console.log('ASCII Encode processed');
      }
      if (selectedAlgorithms.includes('Binary')) {
        results['Binary Encode'] = toBinary(inputString);
        console.log('Binary Encode processed');
      }
      if (selectedAlgorithms.includes('Octal')) {
        results['Octal Encode'] = toOctal(inputString);
        console.log('Octal Encode processed');
      }
      if (selectedAlgorithms.includes('HTML')) {
        results['HTML Encode'] = encodeHtml(inputString);
        console.log('HTML Encode processed');
      }
      if (selectedAlgorithms.includes('MD5')) {
        results['MD5 Hash'] = md5(inputString);
        console.log('MD5 Hash processed');
      }
      if (selectedAlgorithms.includes('SHA1')) {
        results['SHA-1 Hash'] = sha1(inputString);
        console.log('SHA-1 Hash processed');
      }
      if (selectedAlgorithms.includes('SHA256')) {
        results['SHA-256 Hash'] = sha256(inputString);
        console.log('SHA-256 Hash processed');
      }
      if (selectedAlgorithms.includes('AES')) {
        results['AES Encrypt'] = aesEncrypt(inputString, password);
        console.log('AES Encrypt processed');
      }
      if (selectedAlgorithms.includes('DES')) {
        results['DES Encrypt'] = desEncrypt(inputString, password);
        console.log('DES Encrypt processed');
      }
    } else {
      if (selectedAlgorithms.includes('Base64')) {
        results['Base64 Decode'] = safeAtob(inputString);
        console.log('Base64 Decode processed');
      }
      if (selectedAlgorithms.includes('ROT13')) {
        results['ROT13'] = rot13(inputString);
        console.log('ROT13 processed');
      }
      if (selectedAlgorithms.includes('Hex')) {
        results['Hexadecimal Decode'] = fromHex(inputString);
        console.log('Hexadecimal Decode processed');
      }
      if (selectedAlgorithms.includes('ASCII')) {
        results['ASCII Decode'] = fromAscii(inputString);
        console.log('ASCII Decode processed');
      }
      if (selectedAlgorithms.includes('Binary')) {
        results['Binary Decode'] = fromBinary(inputString);
        console.log('Binary Decode processed');
      }
      if (selectedAlgorithms.includes('Octal')) {
        results['Octal Decode'] = fromOctal(inputString);
        console.log('Octal Decode processed');
      }
      if (selectedAlgorithms.includes('HTML')) {
        results['HTML Decode'] = decodeHtml(inputString);
        console.log('HTML Decode processed');
      }
      // AES and DES cannot be decoded unless they were properly encrypted
      if (selectedAlgorithms.includes('AES')) {
        results['AES Decrypt'] = aesDecrypt(inputString, password);
        console.log('AES Decrypt processed');
      }
      if (selectedAlgorithms.includes('DES')) {
        results['DES Decrypt'] = desDecrypt(inputString, password);
        console.log('DES Decrypt processed');
      }
    }

    // Display the results
    displayResults(results);
  }

  function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (const [title, result] of Object.entries(results)) {
      const resultElement = document.createElement('div');
      resultElement.classList.add('result-item');
      resultElement.innerHTML = `<strong>${title}:</strong> <pre>${result}</pre>`;
      resultsDiv.appendChild(resultElement);
    }
  }

  // ROT13 Implementation
  function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
      const code = c.charCodeAt(0);
      const shift = (code >= 65 && code <= 90) ? 65 : 97;
      return String.fromCharCode(((code - shift + 13) % 26) + shift);
    });
  }

  // Base64 decoding with safety check
  function safeAtob(str) {
    try {
      return atob(str);
    } catch (e) {
      return 'Invalid Base64 string';
    }
  }

  // Hexadecimal Encoding/Decoding
  function toHex(str) {
    return str.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
  }

  function fromHex(str) {
    try {
      return str.split(' ').map(c => String.fromCharCode(parseInt(c, 16))).join('');
    } catch (e) {
      return 'Invalid Hexadecimal string';
    }
  }

  // ASCII Encoding/Decoding
  function toAscii(str) {
    return str.split('').map(c => c.charCodeAt(0)).join(' ');
  }

  function fromAscii(str) {
    try {
      return str.split(' ').map(c => String.fromCharCode(c)).join('');
    } catch (e) {
      return 'Invalid ASCII string';
    }
  }

  // Binary Encoding/Decoding
  function toBinary(str) {
    return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  }

  function fromBinary(str) {
    try {
      return str.split(' ').map(c => String.fromCharCode(parseInt(c, 2))).join('');
    } catch (e) {
      return 'Invalid Binary string';
    }
  }

  // Octal Encoding/Decoding
  function toOctal(str) {
    return str.split('').map(c => c.charCodeAt(0).toString(8)).join(' ');
  }

  function fromOctal(str) {
    try {
      return str.split(' ').map(c => String.fromCharCode(parseInt(c, 8))).join('');
    } catch (e) {
      return 'Invalid Octal string';
    }
  }

  // HTML Entity Encoding/Decoding
  function encodeHtml(str) {
    return str.replace(/[&<>"']/g, function(c) {
      return `&#${c.charCodeAt(0)};`;
    });
  }

  function decodeHtml(str) {
    return str.replace(/&#(\d+);/g, function(_, num) {
      return String.fromCharCode(num);
    });
  }

  // MD5 Hashing (One-Way Encryption)
  function md5(str) {
    return CryptoJS.MD5(str).toString();
  }

  // SHA-1 Hashing (One-Way Encryption)
  function sha1(str) {
    return CryptoJS.SHA1(str).toString();
  }

  // SHA-256 Hashing (One-Way Encryption)
  function sha256(str) {
    return CryptoJS.SHA256(str).toString();
  }

  // AES Encryption/Decryption
  function aesEncrypt(message, key) {
    return CryptoJS.AES.encrypt(message, key).toString();
  }

  function aesDecrypt(encrypted, key) {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return 'Invalid AES encrypted string';
    }
  }

  // DES Encryption/Decryption
  function desEncrypt(message, key) {
    return CryptoJS.DES.encrypt(message, key).toString();
  }

  function desDecrypt(encrypted, key) {
    try {
      const bytes = CryptoJS.DES.decrypt(encrypted, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return 'Invalid DES encrypted string';
    }
  }
});
