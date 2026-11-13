{ pkgs ? import <nixpkgs> {} }:
# Hugo version: pinned to 0.169.0 (see .hugo-version and CI workflows).
# If `pkgs.hugo` lags behind, run `nix flake update` to refresh nixpkgs.
pkgs.mkShell {
  buildInputs = with pkgs; [
    hugo
    svgo
  ];
}
