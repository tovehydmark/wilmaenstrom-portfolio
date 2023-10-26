import Link from 'next/link';

const SideMenu = () => {
  return (
    <section className="admin-side-menu">
      <ul>
        <li>
          <Link href="/admin/dashboard/">Bildhantering</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/userInfo">Användarinfo</Link>
        </li>
        <li>
          <Link href="/admin/dashboard/contactInfo">Kontaktuppgifter</Link>
        </li>
      </ul>
    </section>
  );
};
export default SideMenu;
