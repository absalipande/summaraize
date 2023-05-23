const Footer = () => {
  return (
    <footer className='bottom-0 left-0 right-0 py-4 text-center bg-transparent flex flex-col items-center'>
      <hr className='w-full border-t border-gray-300 h-px mb-2' />
      <p className='text-gray-500 text-sm'>
        Made with <span className='text-gray-700'>&#10084;</span> by Amiel
        Brencis Salipande &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
