<?php

namespace App\Entity;

use App\Repository\CardRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CardRepository::class)
 */
class Card
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $recto;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $verso;

    /**
     * @ORM\Column(type="string", length=5)
     */
    private $face;

    /**
     * @ORM\Column(type="integer")
     */
    private $compartment;

    /**
     * @ORM\Column(type="datetime")
     */
    private $nextAt;

    /**
     * @ORM\ManyToOne(targetEntity=Box::class, inversedBy="card")
     * @ORM\JoinColumn(nullable=false)
     */
    private $box;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRecto(): ?string
    {
        return $this->recto;
    }

    public function setRecto(string $recto): self
    {
        $this->recto = $recto;

        return $this;
    }

    public function getVerso(): ?string
    {
        return $this->verso;
    }

    public function setVerso(string $verso): self
    {
        $this->verso = $verso;

        return $this;
    }

    public function getFace(): ?string
    {
        return $this->face;
    }

    public function setFace(string $face): self
    {
        $this->face = $face;

        return $this;
    }

    public function getCompartment(): ?int
    {
        return $this->compartment;
    }

    public function setCompartment(int $compartment): self
    {
        $this->compartment = $compartment;

        return $this;
    }

    public function getNextAt(): ?\DateTimeInterface
    {
        return $this->nextAt;
    }

    public function setNextAt(\DateTimeInterface $nextAt): self
    {
        $this->nextAt = $nextAt;

        return $this;
    }

    public function getBox(): ?Box
    {
        return $this->box;
    }

    public function setBox(?Box $box): self
    {
        $this->box = $box;

        return $this;
    }
}
