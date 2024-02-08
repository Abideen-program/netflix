interface NavbarProp {
  label: string;
}

const NavbarItem = ({ label }: NavbarProp) => {
  return (
    <div className="text-white cursor-pointer transition hover:text-gray-300">
      {label}
    </div>
  );
};

export default NavbarItem;
