export function navigateToSection(id: string): void {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView();
    target.focus();
  }
}

export function targetExternalLinkToNewPage(): void {
  const allLinks = Array.from(document.querySelectorAll('a'));
  if (allLinks.length > 0) {
    allLinks.forEach((link) => {
      if (link.host !== window.location.host) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });
  }
}
