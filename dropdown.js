// Custom Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.custom-dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = dropdown.querySelectorAll('.dropdown-option');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const displayText = dropdown.querySelector('.dropdown-text');

    // Toggle dropdown on trigger click
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Close other dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });

      dropdown.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const value = this.getAttribute('data-value');
        const text = this.textContent;

        // Update hidden input value
        hiddenInput.value = value;

        // Update display text
        displayText.textContent = text;

        // Update selected state
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        // Close dropdown
        dropdown.classList.remove('active');

        // Dispatch change event
        const event = new Event('change', { bubbles: true });
        hiddenInput.dispatchEvent(event);
      });
    });

    // Mark first option as selected initially
    options[0].classList.add('selected');
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });
});
