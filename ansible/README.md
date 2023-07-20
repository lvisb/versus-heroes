# Setup and Deploy with Ansible

## Dependencies

- Ansible
- Ansible Plugins: `community.general.sudoers`, `community.crypto.openssh_keypair`
- Private key

 ~/.ssh/config example:

```conf
Host aws-supaheroes
  Hostname <server-ip>
  Port 22
  User ubuntu
  IdentitiesOnly yes
  IdentityFile <path>
```

## Secrets


## Server Setup 

```bash
ansible-playbook -v setup.yaml
```

## Deploy backend

```bash
ansible-playbook -v backend.yaml
```

## Deploy Frontend CMS

```bash
ansible-playbook -v frontend-cms.yaml
```

## Deploy Frontend Website

```bash
ansible-playbook -v frontend-website.yaml
```
