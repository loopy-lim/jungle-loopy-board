import { Routes } from "@/router";
import { RefAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

interface RoutesLinkProps extends LinkProps {
  to: Routes;
}

const RoutesLink = ({
  ...props
}: RoutesLinkProps & RefAttributes<HTMLAnchorElement>) => <Link {...props} />;

export { RoutesLink };
