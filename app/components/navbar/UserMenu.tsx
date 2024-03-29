'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <AiOutlineMenu />
          {currentUser && (<div className="hidden md:block">
            {`${currentUser?.firstName} ${currentUser?.lastName}`}
          </div>)}
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[100px]
            bg-white
            overflow-hidden
            left-0
            md:left-auto
            md:right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false)
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}

export default UserMenu;
